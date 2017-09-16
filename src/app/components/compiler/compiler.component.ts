import { Component, OnInit } from '@angular/core';
import { LanguageModel } from './compiler.model';

@Component({
    selector: 'wandbox-compiler',
    templateUrl: './compiler.component.html',
    styleUrls: ['./compiler.component.css']
})
export class CompilerComponent implements OnInit {

    selectedLanguage: string;
    selectedLangIndex = 0;
    languages = new Array<LanguageModel>();

    constructor() {
        this.languages.push({
            name: 'test1',
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
                {
                    name: 'test',
                    version: '1.3'
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

    clickLanguage(index:number, event: UIEvent) {
        event.stopPropagation();
        event.preventDefault();
        this.selectedLangIndex = index;
        console.log('active', this.selectedLangIndex);
    }

    ngOnInit() {
    }

}
