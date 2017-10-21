import { TabModel } from '../editor-tab/editor-tab.model';
import { LanguageModel } from '../compiler/compiler.model';

export class CompileResultModel {
    tabName: string;
    languageInfo: LanguageModel;
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

    shareResult: ShareResultModel = null;

    get languageName() {
        return this.languageInfo.languageName;
    }

    get compilerName() {
        const c = this.languageInfo.selectedCompiler;
        return c ? c.displayName + ' ' + c.version : '';
    }

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

export class ShareResultModel {
    isFetched = false;
    url: string;
}

export class EventOutput {
    type: string;
    message: string;
}
