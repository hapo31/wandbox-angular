import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class EditorService {
    changeConfigSubject = new Subject<ChangeConfigEvent>();

    get changeConfig$() {
        return this.changeConfigSubject.asObservable();
    }

    subscribeChange$(eventValue: ChangeConfigEvent) {
        this.changeConfigSubject.next(eventValue);
    }
}

interface ChangeConfigEvent {
    name: string;
    value: string | number;
}