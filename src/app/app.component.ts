import { Component, ViewChild } from '@angular/core';
import { EditorComponent } from './components/editor/editor.component';
import { CompilerComponent } from './components/compiler/compiler.component';
import { RunCompileService } from './components/common/run-compile.service';
import { CompileRequest } from './components/api/compile.model';
import { CheckboxOption } from './components/compiler/compiler.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [RunCompileService]
})
export class AppComponent {
    @ViewChild(EditorComponent) editorComponent: EditorComponent;
    @ViewChild(CompilerComponent) compilerComponent: CompilerComponent;

    constructor(private compile: RunCompileService) {}

    onCompile() {
        const code = this.editorComponent.tabs[0].editorContent;
        const codes = this.editorComponent.tabs.length > 1 ? this.editorComponent.tabs.map(v => ({
            code: v.editorContent,
            file: v.fileName
        })) : [];
        const selectCompiler = this.compilerComponent.selectedCompiler;
        const compiler = selectCompiler.name;
        const options = selectCompiler.options.filter(v =>
            v.type !== 'checkbox' || (v.item as CheckboxOption).checked
        )
        .filter(v => v.item.value.length > 0)
        .map(v => v.item.value)
        .join(',');

        const compileOptionRawIndex = selectCompiler.options.findIndex(v => v.type === 'compile');
        const runtimeOptionRawIndex = selectCompiler.options.findIndex(v => v.type === 'runtime');

        const [ compilerOptionRaw, runtimeOptionRaw ] = [
            compileOptionRawIndex !== -1 ?  selectCompiler.options[compileOptionRawIndex].item.value : undefined,
            runtimeOptionRawIndex !== -1 ? selectCompiler.options[runtimeOptionRawIndex].item.value : undefined,
        ];

        const request: CompileRequest = {
            code: code,
            compiler: compiler,
            options: options,
            save: false,
            stdin: '',
            codes: codes,
            'compiler-option-raw': compilerOptionRaw,
            'runtime-option-raw': runtimeOptionRaw
        };

        this.compile.executeCompileNext(request);

    }
}
