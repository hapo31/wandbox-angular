import { TabModel } from '../editor-tab/editor-tab.model';

export class CompileResultModel {
    tabName: string;
    languageName: string;
    compilerName: string;
    stdin: string;
    tabs: Array<TabModel>;
    activeSourceTabIndex = 0;
    programOutout: string;
    programMessage: string;
    programErrorMessage: string;
    compilerErrorMessage: string;
    signalMessage: string;
    status: number;

    eventSource: boolean;
    outputLines: Array<EventOutput> = [];

    showCode: boolean;
    resultFetched = false;

    get activeTab() {
        return this.tabs[this.activeSourceTabIndex];
    }
}

export class CompileComponentModel {
    compileResults = new Array<CompileResultModel>();
    activeResultIndex = -1;
    compiling = false;
    enableEventSource = false;
    compileCount = 0;
}

export class EventOutput {
    type: string;
    message: string;
}
