import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PostCompileService } from '../api/compile.service';
import { RunCompileService } from '../common/run-compile.service';
import { CompileResultModel } from './compile.model';

@Component({
    selector: 'wandbox-compile',
    templateUrl: './compile.component.html',
    styleUrls: ['./compile.component.css']
})
export class CompileComponent implements OnInit {

    @Output() compile = new EventEmitter();

    compileResults = new Array<CompileResultModel>();

    stdin: string;

    compiling = false;

    compileCount = 0;

    constructor(private apiService: PostCompileService,
        private runCompile: RunCompileService) {
        this.runCompile.executeCompile().subscribe(v => {
            this.compiling = true;
            v.request.stdin = this.stdin;
            const result = new CompileResultModel();
            result.tabName = (this.compileCount + 1).toString();
            this.compileCount++;
            this.compileResults.push(result);
            this.apiService.postCompile(v.request).subscribe(res => {
                result.compilerName = v.compiler.displayName + ' ' + v.compiler.version;
                result.languageName = v.language;
                result.programMessage = res.program_message;
                result.programOutout = res.program_output;
                result.compilerErrorMessage = res.compiler_error;
                result.programErrorMessage = res.program_error;
                result.signalMessage = res.signal;
                result.status = +(res.status !== undefined ? res.status : -1);
                // TODO: ディープコピーが適当すぎる
                result.tabs = JSON.parse(JSON.stringify(v.tabs));

                // receive compile result.
                console.log(res);

                this.compiling = false;
            });
        });
    }

    ngOnInit() {
    }

    postCompile() {
        this.compile.emit();
    }

    removeTab(index: number) {
        this.compileResults.splice(index, 1);
    }

}
