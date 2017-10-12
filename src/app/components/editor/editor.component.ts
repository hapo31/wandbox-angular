import { Component, OnInit, ViewChild, } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as rxjs from 'rxjs/Rx';


import { EditorModel } from './editor.model';
import { TabModel, TabChangedEvent } from '../editor-tab/editor-tab.model';

import { EditorService } from './editor.service';
import { CompilerService } from '../compiler/compiler.service';

import { LocalStorageService } from '../common/local-storage.service';

@Component({
    selector: 'wandbox-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css'],
    providers: [EditorService]
})
export class EditorComponent implements OnInit {

    model = new EditorModel();
    tabs = new Array<TabModel>();
    activeTabIndex = 0;

    constructor(private service: EditorService,
        private compiler: CompilerService,
        private storage: LocalStorageService) {
        // Detection changed mime event from compiler changing.
        this.compiler.selectedLanguage$.subscribe(mime => {
            this.model.mode = mime;
            this.changeConfig('mode', mime);
        });

        // Detection load template from compiler component.
        this.compiler.loadTemplate$.subscribe(info => {
            this.activeTabIndex = 0;
            this.tabs[0].editorContent = info.code;
            this.service.changeEditorTabNext(info.code);
        });
    }

    ngOnInit() {
        if (this.storage.hasValue('tabs')) {
            this.tabs = this.storage.getValue('tabs');
            this.activeTabIndex = this.tabs.findIndex(v => v.isActive);
        } else {
            const firstTab = new TabModel();
            firstTab.isActive = true;
            firstTab.fileName = '';
            firstTab.editorContent = '';
            this.tabs.push(firstTab);
        }
        console.log(this.tabs);
    }

    changeConfig(configName: string, value: string | number) {
        console.log(configName, value);
        this.service.changeConfigNext$({
            name: configName,
            value: value
        });
    }

    tabChanged(event: TabChangedEvent) {
        this.activeTabIndex = event.index;
        this.tabs[this.activeTabIndex].editorContent = event.data.editorContent;
        this.service.changeEditorTabNext(event.data.editorContent);
    }

    get tabDump() {
        return JSON.stringify(this.tabs, null, '\t');
    }
}
