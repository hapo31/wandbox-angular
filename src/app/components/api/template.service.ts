import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TemplateInfo } from './template.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class TemplateAPIService {
    constructor(private http: HttpClient) {
    }
    public fetch$(templateName: string): Observable<TemplateInfo> {
        return this.http.get(environment.baseApiUrl + 'template/' + templateName) as any;
    }
}
