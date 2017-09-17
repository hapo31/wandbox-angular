import { Component, OnInit } from '@angular/core';
import { LanguageModel, OptionType } from './compiler.model';

@Component({
    selector: 'wandbox-compiler',
    templateUrl: './compiler.component.html',
    styleUrls: ['./compiler.component.css']
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

    constructor() {
        this.languages.push({
            name: 'test1',
            mime: 'text/x-test',
            compilers: [
                {
                    name: 'test',
                    version: '1.1',
                    options: [
                        {
                            type: 'checkbox',
                            item: {
                                name: 'testOption',
                                value: '--testoption',
                                checked: true
                            }
                        },
                        {
                            type: 'checkbox',
                            item: {
                                name: 'noDefaultTestOption',
                                value: '--noDefaultTestOption',
                                checked: false
                            }
                        },
                        {
                            type: 'select',
                            item: {
                                value: ['--testoption'],
                                names: ['testOption', 'testOption2'],
                                values: ['--testoption', '--testoption2'],
                            }
                        },
                        {
                            type: 'textarea',
                            item: {
                                name: 'test',
                                value: ''
                            }
                        }
                    ]
                },
                {
                    name: 'test',
                    version: '1.2',
                    options: [

                    ]
                },
                {
                    name: 'test',
                    version: '1.3',
                    options: [

                    ]
                },
            ]
        } as any);
        this.languages.push({
            name: 'test2',
            mime: 'text/x-test',
            compilers: [
                {
                    name: 'test',
                    version: '1.1'
                },
                {
                    name: 'test',
                    version: '1.2'
                },
            ]
        } as any);
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

    ngOnInit() {
    }

}
