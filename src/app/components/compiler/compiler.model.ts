
export interface LanguageModel {
    name: string;
    mime: string;
    compilers: Array<CompilerModel>;
    // get compilerCount() {
    //     return this.compilers.length;
    // }
}

export interface CompilerModel {
    name: string;
    version: string;
}
