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
                    checked: compilerFlag.default,
                    displayFlag: compilerFlag['display-flags']
                };
            } else {
                const selectionFlag = flag as CompilerFlagSelectionInfo;
                option.type = 'select';
                option.item = {
                    name: '',
                    displayFlags: selectionFlag.options.map(v => v['display-flags']),
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

    get displayFlags(): string {
        return this.options
            // textarea type and has value
            .filter(v =>
                ((v.type === 'compile') && v.item.value.length > 0) ||
                (v.type === 'checkbox' && (v.item as CheckboxOption).checked) ||
                (v.type === 'select'))
            .map(v => {
                if (v.type === 'select') {
                    const selectItem = v.item as SelectBoxOption;
                    const index = selectItem.values.findIndex(item => item === selectItem.value);
                    return selectItem.displayFlags[index];
                } else if (v.type === 'compile') {
                    return v.item.value
                        .split('\n')
                        .filter(str => str.length > 0)
                        .map(str => `"${str}"`).join(' ');
                } else {
                    return v.item.displayFlag;
                }
            })
            .join(' ');
    }
}

export class CompilerOptionModel {
    type: 'checkbox' | 'select' | 'runtime' | 'compile';
    item: CheckboxOption | SelectBoxOption | TextAreaOption;
}

export interface OptionItem {
    name: string;
    value: string;
    displayFlag?: string;
}

export interface CheckboxOption extends OptionItem {
    checked: boolean;
}

export type TextAreaOption = OptionItem;

export interface SelectBoxOption extends OptionItem {
    names: string[];
    values: string[];
    displayFlags: string[];
}

export type OptionType = CheckboxOption | SelectBoxOption | TextAreaOption;
