import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { CompileRequest } from '../api/compile.model';
import { CompilerModel } from '../compiler/compiler.model';
import { TabModel } from '../editor-tab/editor-tab.model';

@Injectable()
export class RunCompileService {
    private runCompileSubject = new Subject<RunCompileModel>();

    public executeCompile() {
        return this.runCompileSubject.asObservable();
    }

    public executeCompileNext(data: RunCompileModel) {
        this.runCompileSubject.next(data);
    }
}

interface RunCompileModel {
    request: CompileRequest;
    compiler: CompilerModel;
    tab: Array<TabModel>;
}
