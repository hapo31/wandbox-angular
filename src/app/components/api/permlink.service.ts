import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';

import { CompileResponse } from './compile.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class PermlinkService {

    private subject = new Subject<CompileResponse>();

    constructor(private http: HttpClient, private route: ActivatedRoute) {
        this.checkPermlink$().subscribe(res => {
            this.subject.next(res);
        });
    }

    public changePermlink$() {
        return this.subject.asObservable();
    }

    private checkPermlink$(): Observable<CompileResponse> {
        return Observable.create((observer: Observer<CompileResponse>) => {
            const match = location.href.match(/.*\/permlink\/(.*)\/?/);
            if (match && match.length) {
                const linkId: string = match[1];
                this.http.get(environment.baseApiUrl + 'permlink/' + linkId)
                    .subscribe((res: CompileResponse) => {
                        observer.next(res);
                        observer.complete();
                    },
                    (err) => {
                        observer.error(err);
                    });
            }
        });
    }

}
