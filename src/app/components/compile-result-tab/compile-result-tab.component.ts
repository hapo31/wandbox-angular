import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CompileResultModel, ShareResultModel } from '../compile/compile.model';
import { RunCompileService } from '../common/run-compile.service';
import { } from './compiler-result.model';

@Component({
    selector: 'compile-result-tab',
    templateUrl: './compile-result-tab.component.html',
    styleUrls: ['./compile-result-tab.component.css']
})
export class CompileResultTabComponent {

    @Input() results: Array<CompileResultModel>;
    @Output() changeTab = new EventEmitter<number>();
    @Output() removeTab = new EventEmitter<number>();

    @Input() activeIndex;

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

    activationSourceTab(index: number) {
        this.selectedResult.activeSourceTabIndex = index;
    }

    activationResultTab(index: number) {
        this.changeTab.emit(index);
    }

    clickRemoveTab(index: number) {
        this.removeTab.emit(index);
        if (this.results.length <= this.activeIndex) {
            this.activationResultTab(this.results.length - 1);
        }
        console.log(this.activeIndex);
    }

    onShare() {
        if (!this.selectedResult.resultFetched || this.selectedResult.shareResult != null) {
            return;
        }
        this.selectedResult.shareResult = new ShareResultModel();
        this.compileService.run(
            this.selectedResult.stdin,
            this.selectedResult.tabs,
            this.selectedResult.languageInfo,
            true).subscribe(res => {
                this.selectedResult.shareResult.url = res.permlink;
                this.selectedResult.shareResult.isFetched = true;
            });
    }

}
