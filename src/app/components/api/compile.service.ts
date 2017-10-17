import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { PostEventSource, Action } from '../../utils/PostEventSource';
import { environment } from '../../../environments/environment';
import { CompileRequest, CompileResponse } from './compile.model';

@Injectable()
export class PostCompileService {
    constructor(private http: HttpClient) { }

    public postCompile(param: CompileRequest): Observable<CompileResponse> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
        headers.set('Cache-Control', 'no-cache');
        return this.http.post(environment.baseApiUrl + 'compile.json', param, {
            headers: headers
        }) as any;
    }

    public postCompileEventStream(param: CompileRequest): Observable<Action> {
        const pes = new PostEventSource(environment.baseUrl + 'compile');
        pes.post(param);
        return pes.eventSource;
    }
}
