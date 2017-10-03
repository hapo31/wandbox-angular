import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { CompileRequest } from '../api/compile.model';

@Injectable()
export class RunCompileService {
    private runCompileSubject = new Subject<CompileRequest>();

    public executeCompile() {
        return this.runCompileSubject.asObservable();
    }

    public executeCompileNext(data: CompileRequest) {
        this.runCompileSubject.next(data);
    }
}
