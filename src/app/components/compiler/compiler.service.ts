import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CompilerService {
    private languageSubject = new Subject<string>();

    public get selectedLanguage$() {
        return this.languageSubject.asObservable();
    }

    public selectedLanguageNext(language: string) {
        this.languageSubject.next(language);
    }
}
