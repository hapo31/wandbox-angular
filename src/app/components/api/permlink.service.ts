import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';

import { PermlinkResponse } from './permlink.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class PermlinkService {
    private _loadedPermLink = false;
    private _fetching = false;
    private _resultCache: PermlinkResponse = null;
    private _fetchObserver: Observable<PermlinkResponse> = null;

    private subject = new Subject<PermlinkResponse>();

    constructor(private http: HttpClient, private route: ActivatedRoute) {

    }

    get requested() {
        return this._loadedPermLink;
    }

    public get checkPermlink$(): Observable<PermlinkResponse> {
        const match = location.href.match(/.*\/permlink\/(.*)\/?/);
        this._loadedPermLink = !!(match && match.length);
        console.log(this._loadedPermLink);
        if (this._fetching) {
            return this._fetchObserver;
        } else {
            return this._fetchObserver = Observable.create((observer: Observer<PermlinkResponse>) => {
                if (this._loadedPermLink) {
                    if (this._resultCache != null) {
                        console.log('[PermlinkService]', 'cache subscribe');
                        observer.next(this._resultCache);
                    } else {
                        const linkId: string = match[1];
                        this._loadedPermLink = true;
                        this._fetching = true;
                        console.log('[PermlinkService]', 'fetch permlink');
                        this.http.get(environment.baseApiUrl + 'permlink/' + linkId)
                            .subscribe((res: PermlinkResponse) => {
                                this._resultCache = res;
                                this._fetching = false;
                                console.log('[PermlinkService]', 'subscribe permlink');
                                observer.next(res);
                                observer.complete();
                            },
                            (err) => {
                                observer.error(err);
                            });
                    }
                }
            });
        }
    }

}
