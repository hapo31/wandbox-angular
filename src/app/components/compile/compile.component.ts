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

    model = new CompileResultModel();

    constructor(private apiService: PostCompileService,
        private runCompile: RunCompileService) {
        this.runCompile.executeCompile().subscribe(v => {
            this.apiService.postCompile(v.request).subscribe(res => {
                this.model.compilerName = v.compiler.name;
                this.model.languageName = v.compiler.displayName;
                this.model.result = res.program_output;
                this.model.status = +res.status;

                // receive compile result.
                console.log(res);
            });
        });
    }

    ngOnInit() {
    }

    postCompile() {
        this.compile.emit();
    }

}
