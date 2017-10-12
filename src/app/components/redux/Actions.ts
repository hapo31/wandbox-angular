import { TabModel } from '../editor-tab/editor-tab.model';
import { LanguageModel, CompilerModel, CompilerOptionModel } from '../compiler/compiler.model';

export interface Action<ValueType> {
    type: ActionType;
    value: ValueType;
}

export enum ActionType {
    CHANGE_CONTENT,
    CHANGE_COMPILER,
    CHANGE_LANGUAGE,
    CHANGE_COMPILE_OPTIONS,
    CHANGE_EDITOR_OPTIONS,
    EXECUTE_COMPILE,
}

export function changeContent(tabs: TabModel[]): Action<TabModel[]> {
    return {
        type: ActionType.CHANGE_CONTENT,
        value: tabs
    };
}

export function changeCompiler(compiler: CompilerModel): Action<CompilerModel> {
    return {
        type: ActionType.CHANGE_COMPILER,
        value: compiler
    };
}

export function changeLanguage(language: LanguageModel): Action<LanguageModel> {
    return {
        type: ActionType.CHANGE_LANGUAGE,
        value: language
    };
}

export function changeCompileOptions() {

}
