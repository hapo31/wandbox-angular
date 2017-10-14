import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CompileResultModel } from '../compile/compile.model';
import { RunCompileService } from '../common/run-compile.service';

@Component({
    selector: 'compile-result-tab',
    templateUrl: './compile-result-tab.component.html',
    styleUrls: ['./compile-result-tab.component.css']
})
export class CompileResultTabComponent implements OnInit {

    @Input() results: Array<CompileResultModel>;
    @Output() removeTab = new EventEmitter<number>();

    @Input() activeIndex = -1;

    private emptyTab = new CompileResultModel();

    get selectedResult() {
        return this.results[this.activeIndex] || this.emptyTab;
    }

    constructor(private compileService: RunCompileService) {
        this.emptyTab.tabs = [];
        // this.compileService.executeCompile().subscribe(v => {
        //     this.activeIndex = this.results.length - 1;
        // });
    }

    ngOnInit() {
    }

    activationSourceTab(index: number) {
        this.selectedResult.activeSourceTabIndex = index;
    }

    activationResultTab(index: number) {
        this.activeIndex = index;
    }

    clickRemoveTab(index: number) {
        this.removeTab.emit(index);
        if (this.results.length <= this.activeIndex) {
            this.activationResultTab(this.results.length - 1);
        }
        console.log(this.activeIndex);
    }

}
