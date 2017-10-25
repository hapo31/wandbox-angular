import { Component } from '@angular/core';
import { CompilerComponent } from './components/compiler/compiler.component';
import { RunCompileService } from './components/common/run-compile.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [RunCompileService]
})
export class AppComponent {
}
