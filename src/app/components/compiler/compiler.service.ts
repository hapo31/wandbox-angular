import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { CompilerInfo } from '../api/compiler-list.model';

import { CompilerListApi } from '../api/compiler-list.service';

import { mime } from '../common/language-mime.util';

@Injectable()
export class CompilerService {

    constructor(private listApi: CompilerListApi) {}

    private compilerSubject = new Subject<CompilerInfo>();

    private languageSubject = new Subject<string>();

    public get selectedCompiler$() {
        return this.compilerSubject.asObservable();
    }

    public selectedCompilerNext(compiler: CompilerInfo) {
        this.compilerSubject.next(compiler);
    }

    public get selectedLanguage$(){
        return this.languageSubject.asObservable();
    }

    public selectedLanguageNext(languageName: string) {
        this.languageSubject.next(mime(languageName));
    }

    public fetchCompilerList() {
        return this.listApi.fetch();
    }
}
