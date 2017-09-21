import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

import { CompilerInfo } from '../api/compiler-list.model';
import { CompilerListAPIService } from '../api/compiler-list.service';

import { TemplateAPIService } from '../api/template.service';

import { mime } from '../common/language-mime.util';

@Injectable()
export class CompilerService {

    constructor(private listApi: CompilerListAPIService, private templateApi: TemplateAPIService) { }

    private compilerSubject = new Subject<CompilerInfo>();

    private languageSubject = new Subject<string>();

    private loadTemplateSubject = new Subject<string>();

    public get selectedCompiler$() {
        return this.compilerSubject.asObservable();
    }

    public selectedCompilerNext(compiler: CompilerInfo) {
        this.compilerSubject.next(compiler);
    }

    public get selectedLanguage$() {
        return this.languageSubject.asObservable();
    }

    public selectedLanguageNext(languageName: string) {
        this.languageSubject.next(mime(languageName));
    }

    public fetchCompilerList() {
        return this.listApi.fetch();
    }

    public get loadTemplate$() {
        return this.loadTemplateSubject.asObservable()
            .flatMap(template => this.templateApi.fetch(template));
    }

    public loadTemplateNext(templateName: string) {
        this.loadTemplateSubject.next(templateName);
    }
}
