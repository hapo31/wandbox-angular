import { Component, OnInit, ViewChild, } from '@angular/core';

import { EditorModel } from './editor.model';
import { TabModel, TabChangedEvent } from '../tab/tab.model';

import { EditorService } from './editor.service';
import { CompilerService } from '../compiler/compiler.service';

@Component({
    selector: 'wandbox-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css'],
    providers: [EditorService]
})
export class EditorComponent implements OnInit {

    model = new EditorModel();
    tabs = new Array<TabModel>();
    tabIndex = 0;

    constructor(private service: EditorService, private compiler: CompilerService) {
        this.compiler.selectedLanguage$.subscribe(mime => {
            this.model.mode = mime;
            this.changeConfig('mode', mime);
        });

        this.compiler.loadTemplate$.subscribe(info => {
            this.tabIndex = 0;
            this.tabs[0].editorContent = info.code;
            this.service.changeEditorTabNext(info.code);
        });
    }

    ngOnInit() {
        const firstTab = new TabModel();
        firstTab.isActive = true;
        firstTab.fileName = '';
        firstTab.editorContent = '';
        this.tabs.push(firstTab);
    }

    changeConfig(configName: string, value: string | number) {
        console.log(configName, value);
        this.service.changeConfigNext$({
            name: configName,
            value: value
        });
    }

    editorChanged(event: string | Event) {
        if (typeof event === 'string') {
            this.tabs[this.tabIndex].editorContent = event;
        }
    }

    tabChanged(event: TabChangedEvent) {
        this.tabIndex = event.index;
        this.tabs[this.tabIndex].editorContent = event.data.editorContent;
        this.service.changeEditorTabNext(event.data.editorContent);
    }

    get tabDump() {
        return JSON.stringify(this.tabs, null, '\t');
    }
}
