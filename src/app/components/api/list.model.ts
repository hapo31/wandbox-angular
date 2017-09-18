export interface CompilerInfo {
    'compiler-option-raw': boolean;
    'runtime-option-raw': boolean;
    'display-compile-command': string;
    switched: CompilerFlagInfo[] | CompilerFlagSelectionInfo[];
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
