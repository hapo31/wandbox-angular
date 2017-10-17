import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostCompileService } from '../api/compile.service';
import { RunCompileService } from '../common/run-compile.service';
import { CompileResultModel, CompileComponentModel } from './compile.model';
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
        this.model.compiling = true;
        const result = new CompileResultModel();
        result.tabName = (this.model.compileCount + 1).toString();
        this.model.compileCount++;
        // push to head
        this.model.compileResults.splice(0, 0, result);
        this.model.activeResultIndex = 0;
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

            result.resultFetched = true;
            this.model.compiling = false;
        });
    }

    removeTab(index: number) {
        this.model.compileResults.splice(index, 1);
    }

    changeTab(index: number) {
        this.model.activeResultIndex = index;
    }

}
