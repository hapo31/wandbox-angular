import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

declare class EventSource {
    constructor(url: string);
}

export class EventSourceService {

    private subject = new Subject<Action>();
    private eventSource: any;

    constructor(private targetUrl: string, private method: string) {
        this.eventSource = new window['EventSource'](targetUrl);
    }

}

export interface Action {
    eventType: EventType;
    payload: string;
}

export enum EventType {
    OPEN, MESSAGE, ERROR,
}
