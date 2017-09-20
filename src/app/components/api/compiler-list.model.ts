export interface CompilerInfo {
    'compiler-option-raw': boolean;
    'runtime-option-raw': boolean;
    'display-compile-command': string;
    'display-name': string;
    language: string;
    name: string;
    provider: number;
    templates: string[];
    version: string;
    switches: CompilerFlagInfo[] | CompilerFlagSelectionInfo[];
}

export interface CompilerFlagInfo {
    default: boolean;
    name: string;
    'display-flags': string;
    'display-name': string;
}

export interface CompilerFlagSelectionInfo {
    default: string;
    options: CompilerFlagSelectionItemInfo[];
}

export interface CompilerFlagSelectionItemInfo {
    name: string;
    'display-flags': string;
    'display-name': string;
}
