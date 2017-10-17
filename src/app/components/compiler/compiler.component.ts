import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CompilerComponentModel, LanguageModel, CompilerModel, OptionType } from './compiler.model';
import { CompilerService } from './compiler.service';
import { CompilerInfo } from '../api/compiler-list.model';
import { LocalStorageService } from '../common/local-storage.service';

@Component({
    selector: 'wandbox-compiler',
    templateUrl: './compiler.component.html',
    styleUrls: ['./compiler.component.css'],
})
export class CompilerComponent implements OnInit {

    model = new CompilerComponentModel();

    get selectedLanguage() {
        return this.model.languages[this.model.selectedLangIndex] || null;
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
            this.model.languages = Object.keys(languageDic)
                .map(key => languageDic[key]);
            this.model.fetched = true;


            if (this.storage.hasValue('language')) {
                const language = this.storage.getValue('language');
                let langIndex = this.model.languages.findIndex(v => v.languageName === language);
                if (langIndex === -1) {
                    this.storage.removeValue('language');
                    langIndex = 0;
                }
                this.clickLanguage(langIndex);
            }

        }, (err) => {
            this.model.errorMessage = 'failed loading compiler list!';
        });
    }

    ngOnInit() {
    }

    clickLanguage(index: number, event?: UIEvent) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }

        this.model.selectedLangIndex = index;
        this.storage.setValue('language', this.selectedLanguage.languageName);

        if (this.storage.hasValue('compiler')) {
            const compiler = this.storage.getValue('compiler');
            let compilerIndex = this.selectedLanguage.compilers
                .findIndex(v => this.generateCompileOptionStorageKey(this.selectedLanguage) === compiler);
            if (compilerIndex === -1) {
                this.storage.removeValue('compiler');
                compilerIndex = 0;
            }
            this.clickCompiler(compilerIndex);
        } else {
            this.selectedLanguage.selectedCompilerIndex = 0;
        }
        this.service.selectedLanguageNext(this.selectedLanguage);
        console.log('active', this.model.selectedLangIndex);
    }

    clickCompiler(index: number) {
        const keyName = this.generateCompileOptionStorageKey(this.selectedLanguage);
        this.selectedLanguage.selectedCompilerIndex = index;
        this.storage.setValue('compiler', keyName);
        if (this.storage.hasValue(keyName)) {
            const options = this.storage.getValue(keyName);
            this.selectedLanguage.selectedCompiler.options = options;
        }
    }

    changeOption(index: number, item: OptionType) {
        const keyName = this.generateCompileOptionStorageKey(this.selectedLanguage);
        this.storage.setValue(keyName, this.selectedLanguage.selectedCompiler.options);

        console.log('changed', index, item);
    }

    clickLoadTemplate(templateName: string) {
        this.service.loadTemplateNext(templateName);
        console.log('template', templateName);
    }

    private generateCompileOptionStorageKey(language: LanguageModel) {
        return `compilerOptions-${language.languageName}-${language.selectedCompiler.displayName}-${language.selectedCompiler.version}`;
    }
}
