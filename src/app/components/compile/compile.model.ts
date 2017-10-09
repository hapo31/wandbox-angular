import { TabModel } from '../editor-tab/editor-tab.model';

export class CompileResultModel {
    languageName: string;
    compilerName: string;
    tabs: Array<TabModel>;
    result: string;
    status: number;
}
