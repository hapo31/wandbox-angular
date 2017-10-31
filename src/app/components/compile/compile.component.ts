import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { PostCompileService } from '../api/compile.service';
import { RunCompileService } from '../common/run-compile.service';
import { PermlinkService } from '../api/permlink.service';
import { CompileResultModel, CompileComponentModel } from './compile.model';
import { TabModel, TabChangedEvent } from '../editor-tab/editor-tab.model';
import { LanguageModel } from '../compiler/compiler.model';
import { CompileResultTabComponent } from '../compile-result-tab/compile-result-tab.component';

@Component({
    selector: 'wandbox-compile',
    templateUrl: './compile.component.html',
    styleUrls: ['./compile.component.css'],
})
export class CompileComponent {

    @Output() compile = new EventEmitter();

    @Input() tabs: Array<TabModel>;
    @Input() stdin: string;
    @Input() selectedLanguage: LanguageModel;

    @ViewChild(CompileResultTabComponent) resultTabComponent: CompileResultTabComponent;

    model = new CompileComponentModel();

    constructor(private runCompile: RunCompileService,
        private permlink: PermlinkService) {
        if (this.permlink.requested) {
            this.permlink.checkPermlink$.subscribe(res => {

                const { result, parameter } = res;

                const permlinkTab = new CompileResultModel();
                permlinkTab.tabName = 'permlink';
                permlinkTab.programMessage = result.program_message;
                permlinkTab.programOutout = result.program_output;
                permlinkTab.compilerErrorMessage = result.compiler_error;
                permlinkTab.programErrorMessage = result.program_error;
                permlinkTab.signalMessage = result.signal;
                permlinkTab.status = +(result.status !== undefined ? result.status : -1);
                permlinkTab.stdin = parameter.stdin;

                permlinkTab.languageInfo = new LanguageModel();
                permlinkTab.languageInfo.languageName = parameter['compiler-info'].language;
                permlinkTab.languageInfo.addCompiler(parameter['compiler-info']);

                permlinkTab.tabs = [];

                const sourceTab = new TabModel();
                sourceTab.fileName = '';
                sourceTab.editorContent = parameter.code;

                permlinkTab.tabs.push(sourceTab);

                if (parameter.codes && parameter.codes.length > 0) {
                    for (const code of parameter.codes) {
                        const tab = new TabModel();
                        tab.fileName = code.file;
                        tab.editorContent = code.code;
                        permlinkTab.tabs.push(tab);
                    }
                }

                // push to head
                this.model.compileResults.splice(0, 0, permlinkTab);
                this.model.activeResultIndex = 0;
            });

        }

    }

    /**
     * Handle compile button.
     *
     * @memberof CompileComponent
     */
    postCompile() {
        if (this.model.compiling) {
            return;
        }
        this.model.compiling = true;
        const result = new CompileResultModel();
        result.tabName = (this.model.compileCount + 1).toString();
        this.model.compileCount++;
        // push to head
        this.model.compileResults.splice(0, 0, result);
        this.model.activeResultIndex = 0;

        // TODO: ディープコピーが適当すぎる
        result.languageInfo = this.selectedLanguage;
        result.tabs = JSON.parse(JSON.stringify(this.tabs));
        result.stdin = this.stdin;

        if (this.model.enableEventSource) {
            result.eventSource = true;
            const subscription = this.runCompile.runOnEventSource$(this.stdin, this.tabs, this.selectedLanguage, false)
                .subscribe(event => {
                    console.log('compile', event);
                    switch (event.type) {
                        case 'open':
                            break;
                        case 'timeout':
                        case 'error':
                        case 'exception':
                            result.outputLines.push({
                                type: 'Control',
                                message: 'Finish'
                            });
                            result.resultFetched = true;
                            this.model.compiling = false;
                            subscription.unsubscribe();
                            break;

                        case 'message':
                            result.outputLines.push({ type: event.messageType, message: event.payload });
                            break;

                    }
                }, () => {
                    subscription.unsubscribe();
                    result.resultFetched = true;
                    this.model.compiling = false;
                }, () => {
                    subscription.unsubscribe();
                    result.resultFetched = true;
                    this.model.compiling = false;
                });

        } else {
            result.eventSource = false;
            this.runCompile.run$(this.stdin, this.tabs, this.selectedLanguage, false).subscribe(res => {
                result.programMessage = res.program_message;
                result.programOutout = res.program_output;
                result.compilerErrorMessage = res.compiler_error;
                result.programErrorMessage = res.program_error;
                result.signalMessage = res.signal;
                result.status = +(res.status !== undefined ? res.status : -1);

                result.resultFetched = true;
                this.model.compiling = false;
            });
        }
    }

    removeTab(index: number) {
        this.model.compileResults.splice(index, 1);
    }

    changeTab(index: number) {
        this.model.activeResultIndex = index;
    }

}
