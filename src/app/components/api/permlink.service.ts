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
    private _fetching = false;
    private _resultCache: PermlinkResponse = null;
    private _fetchObserver: Observable<PermlinkResponse> = null;

    private _linkId: string;

    private subject = new Subject<PermlinkResponse>();

    constructor(private http: HttpClient, private route: ActivatedRoute) {
        const match = location.href.match(/.*\/permlink\/(.*)\/?/);
        if (match && match.length) {
            this._linkId = match[1];
        } else {
            this._linkId = '';
        }
    }

    get requested() {
        return this._linkId.length > 0;
    }

    /**
     * Check permlink id in url.
     *
     * @readonly
     * @type {Observable<PermlinkResponse>}
     * @memberof PermlinkService
     */
    public get checkPermlink$(): Observable<PermlinkResponse> {
        if (!this._fetching && this.requested) {
            if (this._resultCache != null) {
                console.log('[PermlinkService]', 'cache subscribe');
                this.subject.next(this._resultCache);
            } else {
                this._fetching = true;
                console.log('[PermlinkService]', 'fetch permlink');
                this.http.get<PermlinkResponse>(environment.baseApiUrl + 'permlink/' + this._linkId)
                    .subscribe(res => {
                        this._resultCache = res;
                        this._fetching = false;
                        console.log('[PermlinkService]', 'subscribe permlink');
                        this.subject.next(res);
                        this.subject.complete();
                    },
                    (err) => {
                        this.subject.error(err);
                    });
            }
        }

        return this.subject.asObservable();
    }

}
