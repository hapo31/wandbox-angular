import { Component, OnInit, Input } from '@angular/core';
import { CompileResultModel } from '../compile/compile.model';
import { RunCompileService } from '../common/run-compile.service';

@Component({
    selector: 'compile-result-tab',
    templateUrl: './compile-result-tab.component.html',
    styleUrls: ['./compile-result-tab.component.css']
})
export class CompileResultTabComponent implements OnInit {

    @Input() results: Array<CompileResultModel>;

    activeIndex = 0;

    get selectedResult() {
        return this.results[this.activeIndex];
    }

    constructor(private compileService: RunCompileService) {
        this.compileService.executeCompile().subscribe(v => {
            this.activeIndex = this.results.length;
        });
     }

    ngOnInit() {
    }

    activationSourceTab(index: number) {
        this.selectedResult.activeSourceTabIndex = index;
    }

    activationResultTab(index: number) {
        this.activeIndex = index;
    }

}
