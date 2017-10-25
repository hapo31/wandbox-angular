import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { CompileResponse } from './compile.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class PermlinkService {

    subject = new Subject<CompileResponse>();

    constructor(private http: HttpClient, private route: ActivatedRoute) {
        this.route.params
            .flatMap(linkId => {
                return this.http.get(environment.baseApiUrl + 'permlink/' + linkId);
            })
            .subscribe((res: CompileResponse) => {
                this.subject.next(res);
            });
    }

    public changePermlink$() {
        return this.subject.asObservable();
    }
}
