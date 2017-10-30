import { Component } from '@angular/core';
import { RunCompileService } from './components/common/run-compile.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-wandbox',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [RunCompileService]
})
export class AppComponent {
    constructor() {

    }
}
