import { Component, OnInit } from '@angular/core';
import { LanguageModel, OptionType } from './compiler.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { CompilerListApi } from '../api/compiler-list.service';
import { CompilerInfo } from '../api/compiler-list.model';

@Component({
    selector: 'wandbox-compiler',
    templateUrl: './compiler.component.html',
    styleUrls: ['./compiler.component.css'],
    providers: [CompilerListApi]
})
export class CompilerComponent implements OnInit {


    get selectedLanguage() {
        return this.languages[this.selectedLangIndex];
    }

    get selectedCompiler() {
        const selectedLanguage = this.selectedLanguage;
        return selectedLanguage.compilers[selectedLanguage.selectedCompilerIndex || 0];
    }

    selectedLangIndex = 0;

    languages = new Array<LanguageModel>();

    fetched = false;

    errorMessage = '';

    constructor(private listApi: CompilerListApi) {
        this.listApi.fetch().subscribe(compilerList => {
            const languageDic: { [key: string]: LanguageModel } = {};
            for (let i = 0; i < compilerList.length; ++i) {
                const languageName = compilerList[i].language;
                if (languageDic[languageName] == null) {
                    languageDic[languageName] = new LanguageModel();
                    languageDic[languageName].languageName = languageName;
                }
                languageDic[languageName].addCompiler(compilerList[i]);
            }
            this.languages = Object.keys(languageDic).map(key => languageDic[key]);
            this.fetched = true;
        }, (err) => {
            this.errorMessage = 'failed loading compiler list!';
        });
    }

    clickLanguage(index: number, event: UIEvent) {
        event.stopPropagation();
        event.preventDefault();
        this.selectedLangIndex = index;
        this.selectedLanguage.selectedCompilerIndex = 0;
        console.log('active', this.selectedLangIndex);
    }

    clickCompiler(index: number) {
        this.selectedLanguage.selectedCompilerIndex = index;

    }

    changeOption(index: number, item: OptionType) {
        console.log('changed', index, item);
    }

    clickLoadTemplate(templateName: string) {
        console.log('template', templateName);
    }

    ngOnInit() {
    }

}
