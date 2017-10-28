import { Component, OnInit, ViewChild, } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as rxjs from 'rxjs/Rx';

import { EditorComponentModel } from './editor.model';
import { CompileComponent } from '../compile/compile.component';
import { TabModel, TabChangedEvent } from '../editor-tab/editor-tab.model';
import { EditorService } from './editor.service';
import { CompilerService } from '../compiler/compiler.service';
import { LanguageModel } from '../compiler/compiler.model';
import { LocalStorageService } from '../common/local-storage.service';
import { RunCompileService } from '../common/run-compile.service';
import { ActivatedRoute } from '@angular/router';
import { mime } from '../common/language-mime.util';

@Component({
    selector: 'wandbox-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css'],
    providers: [EditorService]
})
export class EditorComponent implements OnInit {

    @ViewChild(CompileComponent) compileComponent: CompileComponent;

    model = new EditorComponentModel();

    constructor(private service: EditorService,
        private compiler: CompilerService,
        private storage: LocalStorageService,
        private route: ActivatedRoute) {
        // Detection changed mime event from compiler changing.
        this.compiler.selectedLanguage$.subscribe(language => {
            const mimeStr = mime(language.languageName);
            this.model.mode = mimeStr;
            this.model.selectedLanguage = language;
            this.model.config.mode = mimeStr;
            this.changeConfig('mode');
        });

        // Detection load template from compiler component.
        this.compiler.loadTemplate$.subscribe(info => {
            this.model.activeTabIndex = 0;
            this.model.tabs[0].editorContent = info.code;
            this.service.changeEditorTabNext(info.code);
        });
    }

    ngOnInit() {

        console.log('param', this.route.snapshot.params);

        // Load tab data from local storage.
        if (this.storage.hasValue('tabs')) {
            this.model.tabs = this.storage.getValue('tabs');
            this.model.activeTabIndex = this.model.tabs.findIndex(v => v.isActive);
        } else {
            // initialize tab data.
            const firstTab = new TabModel();
            firstTab.isActive = true;
            firstTab.fileName = '';
            firstTab.editorContent = '';
            this.model.tabs.push(firstTab);
        }

        if (this.storage.hasValue('editorConfig')) {
            this.model.config = this.storage.getValue('editorConfig');
            // JSON.stringfy() converts Infinity to null
            if (this.model.config.viewportMargin === null) {
                this.model.config.viewportMargin = Infinity;
            }
        }
    }

    /**
     * Detection changed config.
     *
     * @param {string} configName
     * @memberof EditorComponent
     */
    changeConfig(configName: string) {
        this.storage.setValue('editorConfig', this.model.config);
        // send config data to codemirror component.
        this.service.changeConfigNext$({
            name: configName,
            value: this.model.config[configName]
        });
    }

    /**
     * Detection changed tab.
     *
     * @param {TabChangedEvent} event
     * @memberof EditorComponent
     */
    tabChanged(event: TabChangedEvent) {
        this.model.activeTabIndex = event.index;
        this.model.tabs[this.model.activeTabIndex].editorContent = event.data.editorContent;
        this.service.changeEditorTabNext(event.data.editorContent);
    }

    onCompileCommand() {
        this.compileComponent.postCompile();
    }
}
