import { Component, OnInit, ViewChild, } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as rxjs from 'rxjs/Rx';

import { EditorModel } from './editor.model';
import { TabModel, TabChangedEvent } from '../editor-tab/editor-tab.model';
import { EditorService } from './editor.service';
import { CompilerService } from '../compiler/compiler.service';
import { LanguageModel } from '../compiler/compiler.model';
import { LocalStorageService } from '../common/local-storage.service';
import { RunCompileService } from '../common/run-compile.service';
import { mime } from '../common/language-mime.util';

@Component({
    selector: 'wandbox-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css'],
    providers: [EditorService]
})
export class EditorComponent implements OnInit {

    model = new EditorModel();
    tabs = new Array<TabModel>();
    selectedLanguage: LanguageModel;
    activeTabIndex = 0;

    constructor(private service: EditorService,
        private compiler: CompilerService,
        private storage: LocalStorageService) {
        // Detection changed mime event from compiler changing.
        this.compiler.selectedLanguage$.subscribe(language => {
            const mimeStr = mime(language.languageName);
            this.model.mode = mimeStr;
            this.selectedLanguage = language;
            this.changeConfig('mode', mimeStr);
        });

        // Detection load template from compiler component.
        this.compiler.loadTemplate$.subscribe(info => {
            this.activeTabIndex = 0;
            this.tabs[0].editorContent = info.code;
            this.service.changeEditorTabNext(info.code);
        });
    }

    ngOnInit() {
        // Load tab data from local storage.
        if (this.storage.hasValue('tabs')) {
            this.tabs = this.storage.getValue('tabs');
            this.activeTabIndex = this.tabs.findIndex(v => v.isActive);
        } else {
            // initialize tab data.
            const firstTab = new TabModel();
            firstTab.isActive = true;
            firstTab.fileName = '';
            firstTab.editorContent = '';
            this.tabs.push(firstTab);
        }

        if (this.storage.hasValue('editorConfig')) {
            this.model.config = this.storage.getValue('editorConfig');
        }
    }

    /**
     * Detection changed config.
     *
     * @param {string} configName
     * @param {(string | number)} value
     * @memberof EditorComponent
     */
    changeConfig(configName: string, value: string | number) {
        this.storage.setValue('editorConfig', this.model.config);

        // send config data to codemirror component.
        this.service.changeConfigNext$({
            name: configName,
            value: value
        });
    }

    /**
     * Detection changed tab.
     *
     * @param {TabChangedEvent} event
     * @memberof EditorComponent
     */
    tabChanged(event: TabChangedEvent) {
        this.activeTabIndex = event.index;
        this.tabs[this.activeTabIndex].editorContent = event.data.editorContent;
        this.service.changeEditorTabNext(event.data.editorContent);
    }
}
