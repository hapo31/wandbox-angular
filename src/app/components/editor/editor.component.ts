import { Component, OnInit, ViewChild } from '@angular/core';

import { EditorModel } from './editor.model';

import { EditorService } from './editor.service';

import { TabComponent } from './tab/tab.component';
import { TabModel, TabChangedEvent } from './tab/tab.model';

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

    @ViewChild(TabComponent) editorTab: TabComponent;

    constructor(private service: EditorService) { }

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
