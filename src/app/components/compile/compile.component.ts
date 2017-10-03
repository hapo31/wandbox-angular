import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PostCompileService } from '../api/compile.service';
import { RunCompileService } from '../common/run-compile.service';

@Component({
    selector: 'wandbox-compile',
    templateUrl: './compile.component.html',
    styleUrls: ['./compile.component.css']
})
export class CompileComponent implements OnInit {

    @Output() compile = new EventEmitter();

    constructor(private apiService: PostCompileService,
        private runCompile: RunCompileService) {
        this.runCompile.executeCompile().subscribe(v => {
            this.apiService.postCompile(v).subscribe(res => {
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
