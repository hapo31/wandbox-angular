import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { PostCompileService } from '../api/compile.service';
import { RunCompileService } from '../common/run-compile.service';
import { CompileResultModel, CompileComponentModel } from './compile.model';
import { TabModel, TabChangedEvent } from '../editor-tab/editor-tab.model';
import { LanguageModel } from '../compiler/compiler.model';
import { CompileResultTabComponent } from '../compile-result-tab/compile-result-tab.component';

@Component({
    selector: 'wandbox-compile',
    templateUrl: './compile.component.html',
    styleUrls: ['./compile.component.css'],
})
export class CompileComponent implements OnInit {

    @Output() compile = new EventEmitter();

    @Input() tabs: Array<TabModel>;
    @Input() stdin: string;
    @Input() selectedLanguage: LanguageModel;

    @ViewChild(CompileResultTabComponent) resultTabComponent: CompileResultTabComponent;

    model = new CompileComponentModel();

    constructor(private runCompile: RunCompileService) {
    }

    ngOnInit() {
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

        const evEnable = true;
        const compiler = this.selectedLanguage.selectedCompiler;


        result.compilerName = compiler.displayName + ' ' + compiler.version;
        result.languageName = this.selectedLanguage.languageName;
        // TODO: ディープコピーが適当すぎる
        result.tabs = JSON.parse(JSON.stringify(this.tabs));

        if (this.model.enableEventSource) {
            result.eventSource = true;
            const subscription = this.runCompile.runOnEventSource(this.stdin, this.tabs, this.selectedLanguage)
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
            this.runCompile.run(this.stdin, this.tabs, this.selectedLanguage).subscribe(res => {
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
