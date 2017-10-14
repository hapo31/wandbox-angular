import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostCompileService } from '../api/compile.service';
import { RunCompileService } from '../common/run-compile.service';
import { CompileResultModel } from './compile.model';
import { TabModel, TabChangedEvent } from '../editor-tab/editor-tab.model';
import { LanguageModel } from '../compiler/compiler.model';

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

    compileResults = new Array<CompileResultModel>();
    activeResultIndex = -1;
    compiling = false;
    compileCount = 0;

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
        this.compiling = true;
        const result = new CompileResultModel();
        result.tabName = (this.compileCount + 1).toString();
        this.compileCount++;
        this.compileResults.push(result);
        this.activeResultIndex = this.compileResults.length - 1;
        this.runCompile.run(this.stdin, this.tabs, this.selectedLanguage).subscribe(res => {
            const compiler = this.selectedLanguage.selectedCompiler;

            result.compilerName = compiler.displayName + ' ' + compiler.version;
            result.languageName = this.selectedLanguage.languageName;
            result.programMessage = res.program_message;
            result.programOutout = res.program_output;
            result.compilerErrorMessage = res.compiler_error;
            result.programErrorMessage = res.program_error;
            result.signalMessage = res.signal;
            result.status = +(res.status !== undefined ? res.status : -1);
            // TODO: ディープコピーが適当すぎる
            result.tabs = JSON.parse(JSON.stringify(this.tabs));

            this.compiling = false;
        });
    }

    removeTab(index: number) {
        this.compileResults.splice(index, 1);
    }

    changeTab(index: number) {
        this.activeResultIndex = index;
    }

}
