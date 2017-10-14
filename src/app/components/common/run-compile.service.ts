import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { PostCompileService } from '../api/compile.service';
import { CompileRequest } from '../api/compile.model';
import { LanguageModel, CompilerModel, CheckboxOption } from '../compiler/compiler.model';
import { TabModel } from '../editor-tab/editor-tab.model';

@Injectable()
export class RunCompileService {
    private runCompileSubject = new Subject<RunCompileModel>();

    constructor(private compileApi: PostCompileService) {

    }

    /**
     * Create compile request params
     *
     * @param {string} stdin
     * @param {Array<TabModel>} tabs
     * @param {LanguageModel} language
     * @returns
     * @memberof RunCompileService
     */
    public run(stdin: string, tabs: Array<TabModel>, language: LanguageModel) {
        const code = tabs[0].editorContent;
        const codes = tabs.length > 1 ? tabs.map(v => ({
            code: v.editorContent,
            file: v.fileName
        })) : [];
        const selectCompiler = language.selectedCompiler;
        const compiler = selectCompiler.name;
        const options = selectCompiler.options
            .filter(v =>
                v.type !== 'checkbox' || (v.item as CheckboxOption).checked
            )
            .filter(v => v.item.value.length > 0)
            .map(v => v.item.value)
            .join(',');

        const compileOptionRawIndex = selectCompiler.options.findIndex(v => v.type === 'compile');
        const runtimeOptionRawIndex = selectCompiler.options.findIndex(v => v.type === 'runtime');

        const [compilerOptionRaw, runtimeOptionRaw] = [
            compileOptionRawIndex !== -1 ? selectCompiler.options[compileOptionRawIndex].item.value : undefined,
            runtimeOptionRawIndex !== -1 ? selectCompiler.options[runtimeOptionRawIndex].item.value : undefined,
        ];

        const request: CompileRequest = {
            code: code,
            compiler: compiler,
            options: options,
            save: false,
            stdin: stdin,
            codes: codes,
            'compiler-option-raw': compilerOptionRaw,
            'runtime-option-raw': runtimeOptionRaw
        };

        return this.compileApi.postCompile(request);
    }

}

interface RunCompileModel {
    language: string;
    request: CompileRequest;
    compiler: CompilerModel;
    tabs: Array<TabModel>;
}
