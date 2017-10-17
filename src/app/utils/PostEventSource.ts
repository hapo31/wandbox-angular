import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export class PostEventSource {

    private subject = new Subject<Action>();
    private data: string[] = [];
    private chache = '';
    private lastEventId: string = null;
    private readyState: EV_READY_STATE = EV_READY_STATE.CONNECTING;
    private xhr: XMLHttpRequest;

    constructor(private targetUrl: string, private timeout = 50000) {
    }

    public get eventSource() {
        return this.subject.asObservable();
    }

    public post(request: Object) {
        try {
            this.chache = '';
            const xhr = new XMLHttpRequest();
            xhr.open('POST', this.targetUrl, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('Accept', 'text/event-stream');
            xhr.setRequestHeader('Cache-Control', 'no-cache');
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

            if (this.lastEventId != null) {
                xhr.setRequestHeader('Last-Event-ID', this.lastEventId);
            }

            xhr.timeout = this.timeout;

            xhr.onreadystatechange = () => {
                if (xhr.readyState === READY_STATE.LOADING || (xhr.readyState === READY_STATE.DONE && xhr.status === 200)) {
                    // on SUCCESS
                    if (this.readyState === EV_READY_STATE.CONNECTING) {
                        this.readyState = EV_READY_STATE.OPEN;
                        this.subject.next({ type: 'open' });
                    }

                    const responseSrc = xhr.responseText;
                    const payloadIndex = responseSrc.lastIndexOf('\n');
                    const responseText = responseSrc.substr(0, payloadIndex);
                    const parts = responseText.substr(this.chache.length).split('\n');
                    let eventType = 'message';
                    this.chache = responseText;

                    console.log('event src', parts);
                    for (const line of parts) {
                        if (line.indexOf('event') === 0) {
                            eventType = line.replace(/event:? ?/, '');
                        } else if (line.indexOf('retry') === 0) {
                            const retry = parseInt(line.replace(/retry:? ?/, ''), 10);
                            // if (!isNaN(retry)) { interval = retry; }
                        } else if (line.indexOf('data') === 0) {
                            // push payload.
                            this.data.push(line.replace(/data:? ?/, ''));
                        } else if (line.indexOf('id:') === 0) {
                            this.lastEventId = line.replace(/id:? ?/, '');
                        } else if (line.indexOf('id') === 0) { // Reset lastEventId
                            this.lastEventId = null;
                        } else if (line.length === 0) {
                            if (this.data.length > 0) {
                                console.log(this.data);
                                const messagePart = this.data.join('\n').split(':');
                                const [type] = messagePart.splice(0, 1);
                                const message = messagePart.join();
                                this.subject.next({
                                    type: 'message',
                                    messageType: type,
                                    lastEventId: this.lastEventId,
                                    payload: message
                                });
                                this.data = [];
                                eventType = 'message';
                                if (type === 'Control' && message === 'Finish') {
                                    this.subject.complete();
                                }
                            }
                        }
                    }
                } else if (this.readyState === EV_READY_STATE.OPEN && xhr.status === 400) {
                    this.close();
                } else if (this.readyState !== EV_READY_STATE.CLOSED) {
                    // on Error
                    if (xhr.readyState === READY_STATE.DONE) {
                        this.readyState = EV_READY_STATE.ERROR;
                        this.subject.next({ type: 'error' });
                    }
                }
            };

            xhr.send(JSON.stringify(request));

            setTimeout(() => {
                if (xhr.readyState === READY_STATE.HEADERS_RECEIVED) {
                    xhr.abort();
                    this.subject.next({ type: 'timeout' });
                }
            }, this.timeout);
            this.xhr = xhr;
        } catch (e) {
            this.subject.next({ type: 'exception', error: e });
        }
        return;
    }

    public close() {
        this.readyState = EV_READY_STATE.CLOSED;
        this.subject.complete();
        this.xhr.abort();
    }
}

enum READY_STATE {
    UNSENT,
    OPENED,
    HEADERS_RECEIVED,
    LOADING,
    DONE
}

enum EV_READY_STATE {
    CONNECTING,
    OPEN,
    CLOSED,
    ERROR,
}

export interface Action {
    type: string;
    error?: any;
    messageType?: string;
    payload?: string;
    lastEventId?: string;
}

export enum EventType {
    OPEN, MESSAGE, ERROR,
}
