import { CompilerInfo, CompilerFlagInfo, CompilerFlagSelectionInfo } from '../api/compiler-list.model';

export class LanguageModel {
    languageName = '';
    mime = '';
    selectedCompilerIndex = 0;
    compilers: Array<CompilerModel> = [];

    addable(compiler: CompilerInfo) {
        return this.languageName === compiler.language;
    }

    addCompiler(compiler: CompilerInfo) {
        const result = new CompilerModel();
        result.name = compiler.name;
        result.displayName = compiler['display-name'];
        result.version = compiler.version;
        result.template = compiler.templates[0] || '';
        result.compileCommand = compiler['display-compile-command'];
        result.options = [];
        for (const flag of compiler.switches) {
            const option = new CompilerOptionModel();
            if (typeof flag.default === 'boolean') {
                const compilerFlag = flag as CompilerFlagInfo;
                option.type = 'checkbox';
                option.item = {
                    name: compilerFlag['display-name'],
                    value: compilerFlag.name,
                    checked: compilerFlag.default
                };
            } else {
                const selectionFlag = flag as CompilerFlagSelectionInfo;
                option.type = 'select';
                option.item = {
                    value: selectionFlag.default,
                    names: selectionFlag.options.map(v => v['display-name']),
                    values: selectionFlag.options.map(v => v.name)
                };
            }
            result.options.push(option);
        }

        if (compiler['compiler-option-raw']) {
            result.options.push({
                type: 'compile',
                item: {
                    name: 'Compiler options',
                    value: ''
                },
            });
        }

        // if (compiler['runtime-option-raw']) {
        result.options.push({
            type: 'runtime',
            item: {
                name: 'Runtime options',
                value: ''
            },
        });
        // }
        this.compilers.push(result);
    }
}

export class CompilerModel {
    name: string;
    displayName: string;
    compileCommand: string;
    provider: number;
    version: string;
    template: string;
    options: Array<CompilerOptionModel>;
}

export class CompilerOptionModel {
    type: 'checkbox' | 'select' | 'runtime' | 'compile';
    item: CheckboxOption | SelectBoxOption | TextAreaOption;
}

export interface CheckboxOption {
    name: string;
    value: string;
    checked: boolean;
}

export interface TextAreaOption {
    name: string;
    value: string;
}

export interface SelectBoxOption {
    value: string;
    names: string[];
    values: string[];
}

export type OptionType = CheckboxOption | SelectBoxOption | TextAreaOption;
