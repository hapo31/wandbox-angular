import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { environment } from '../../../environments/environment';

import { CompileRequest, CompileResponse } from './compile.model';

@Injectable()
export class PostCompileService {
    constructor(private http: HttpClient) {}

    public postCompile(param: CompileRequest): Observable<CompileResponse> {
        const headers = new HttpHeaders();
        headers.set('Content-Type', 'application/json');
        headers.set('Cache-Control', 'no-cache');
        return this.http.post(environment.baseUrl + 'compile.json', param, {
            headers: headers
        }) as any;
    }
}
