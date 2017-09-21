import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { CompilerInfo } from './compiler-list.model';
import { LanguageModel, CompilerModel, OptionType } from '../compiler/compiler.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class CompilerListAPIService {

    constructor(private http: HttpClient) { }

    fetch(): Observable<Array<CompilerInfo>> {
        return this.http.get(environment.baseUrl + 'list.json') as any;
    }
}
