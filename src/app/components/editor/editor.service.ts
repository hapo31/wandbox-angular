import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class EditorService {
    private changeConfigSubject = new Subject<ChangeConfigEvent>();
    private changeEditorSubject = new Subject<string>();

    get changeConfig$() {
        return this.changeConfigSubject.asObservable();
    }

    changeConfigNext$(eventValue: ChangeConfigEvent) {
        this.changeConfigSubject.next(eventValue);
    }

    get changeEditorTab$() {
        return this.changeEditorSubject.asObservable();
    }

    changeEditorTabNext(value: string) {
        this.changeEditorSubject.next(value);
    }
}

interface ChangeConfigEvent {
    name: string;
    value: string | number;
}