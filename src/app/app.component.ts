import { Component, ViewChild } from '@angular/core';
import { EditorComponent } from './components/editor/editor.component';
import { CompilerComponent } from './components/compiler/compiler.component';
import { CheckboxOption, CompilerOptionModel, TextAreaOption, SelectBoxOption } from './components/compiler/compiler.model';
import { RunCompileService } from './components/common/run-compile.service';
import { CompileRequest } from './components/api/compile.model';

import { LocalStorageService } from './components/common/local-storage.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [RunCompileService ]
})
export class AppComponent {
    @ViewChild(EditorComponent) editorComponent: EditorComponent;
    @ViewChild(CompilerComponent) compilerComponent: CompilerComponent;

    constructor(private compile: RunCompileService, storage: LocalStorageService) { }
}
