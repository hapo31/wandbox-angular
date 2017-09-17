
export interface LanguageModel {
    name: string;
    mime: string;
    templateName: string;
    selectedCompilerIndex: number;
    compilers: Array<CompilerModel>;
}

export interface CompilerModel {
    name: string;
    version: string;
    options: Array<CompilerOptionModel>;
}

export interface CompilerOptionModel {
    type: 'checkbox' | 'select' | 'textarea';
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
