import { Component } from '@angular/core';
import { RunCompileService } from './components/common/run-compile.service';
import { PermlinkService } from './components/api/permlink.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-wandbox',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [RunCompileService]
})
export class AppComponent {

    test = new Observable<number>();

    constructor(private permlink: PermlinkService) {

    }
}
