import { CompilerInfo } from './compiler-list.model';
import { CompileResponse, CodeListModel } from './compile.model';

export interface PermlinkResponse {
    parameter: Parameter;
    result: CompileResponse;
}


export interface Parameter {
    code: string;
    codes?: CodeListModel[];
    compiler: string;
    'compiler-info': CompilerInfo;
    'compiler-option-raw': string;
    description: string;
    created_at: number;
    github_user: string;
    stdin: string;
    title: string;
}
