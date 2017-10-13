import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LanguageModel, CompilerModel, OptionType } from './compiler.model';
import { CompilerService } from './compiler.service';
import { CompilerInfo } from '../api/compiler-list.model';
import { LocalStorageService } from '../common/local-storage.service';

@Component({
    selector: 'wandbox-compiler',
    templateUrl: './compiler.component.html',
    styleUrls: ['./compiler.component.css'],
})
export class CompilerComponent implements OnInit {

    selectedLangIndex = 0;
    languages = new Array<LanguageModel>();
    fetched = false;
    errorMessage = '';

    get selectedLanguage() {
        return this.languages[this.selectedLangIndex] || null;
    }

    get selectedCompiler() {
        const selectedLanguage = this.selectedLanguage;
        return selectedLanguage != null ? selectedLanguage.compilers[selectedLanguage.selectedCompilerIndex] : null;
    }

    constructor(private service: CompilerService,
        private storage: LocalStorageService) {
        this.service.fetchCompilerList().subscribe(compilerList => {
            const languageDic: { [key: string]: LanguageModel } = {};
            for (let i = 0; i < compilerList.length; ++i) {
                const languageName = compilerList[i].language;
                if (languageDic[languageName] == null) {
                    languageDic[languageName] = new LanguageModel();
                    languageDic[languageName].languageName = languageName;
                }
                languageDic[languageName].addCompiler(compilerList[i]);
            }
            this.languages = Object.keys(languageDic)
                .map(key => languageDic[key]);
            this.fetched = true;


            if (this.storage.hasValue('language')) {
                const language = this.storage.getValue('language');
                let langIndex = this.languages.findIndex(v => v.languageName === language);
                if (langIndex === -1) {
                    this.storage.removeValue('language');
                    langIndex = 0;
                }
                this.clickLanguage(langIndex);
            }

        }, (err) => {
            this.errorMessage = 'failed loading compiler list!';
        });
    }

    ngOnInit() {
    }

    clickLanguage(index: number, event?: UIEvent) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }

        this.selectedLangIndex = index;
        this.storage.setValue('language', this.selectedLanguage.languageName);

        if (this.storage.hasValue('compiler')) {
            const compiler = this.storage.getValue('compiler');
            let compilerIndex = this.selectedLanguage.compilers
                .findIndex(v => this.generateCompileOptionStorageKey(this.selectedLanguage, v) === compiler);
            if (compilerIndex === -1) {
                this.storage.removeValue('compiler');
                compilerIndex = 0;
            }
            this.clickCompiler(compilerIndex);
        } else {
            this.selectedLanguage.selectedCompilerIndex = 0;
        }
        this.service.selectedLanguageNext(this.selectedLanguage.languageName);
        console.log('active', this.selectedLangIndex);
    }

    clickCompiler(index: number) {
        const keyName = this.generateCompileOptionStorageKey(this.selectedLanguage, this.selectedCompiler);
        this.selectedLanguage.selectedCompilerIndex = index;
        this.storage.setValue('compiler', keyName);
        if (this.storage.hasValue(keyName)) {
            const options = this.storage.getValue(keyName);
            this.selectedCompiler.options = options;
        }
    }

    changeOption(index: number, item: OptionType) {
        const keyName = this.generateCompileOptionStorageKey(this.selectedLanguage, this.selectedCompiler);
        this.storage.setValue(keyName, this.selectedCompiler.options);

        console.log('changed', index, item);
    }

    clickLoadTemplate(templateName: string) {
        this.service.loadTemplateNext(templateName);
        console.log('template', templateName);
    }

    private generateCompileOptionStorageKey(language: LanguageModel, compiler: CompilerModel) {
        return `compilerOptions-${language.languageName}-${compiler.displayName}-${compiler.version}`;
    }
}
