import { TabModel } from '../editor-tab/editor-tab.model';
import { LanguageModel } from '../compiler/compiler.model';

/* *
* Model for EditorComponent
*
* @export
* @class EditorModel
*/
export class EditorComponentModel {
    config: EditorConfigModel = new EditorConfigModel();
    stdin: string;
    tabs = new Array<TabModel>();
    selectedLanguage: LanguageModel;
    activeTabIndex = 0;

    get dump() {
        return JSON.stringify(this.config, null, '\n');
    }

    get mode() {
        return this.config.mode;
    }
    set mode(value) {
        this.config.mode = value;
    }

    get keyMap() {
        return this.config.keyMap;
    }
    set keyMap(value) {
        this.config.keyMap = value;
    }

    get tabSize() {
        return this.config.tabSize;
    }
    set tabSize(value: number) {
        this.config.tabSize = +value;
    }

    get smartIndent() {
        return this.config.smartIndent;
    }
    set smartIndent(value) {
        this.config.smartIndent = value;
    }

    get indentWithTabs() {
        return this.config.indentWithTabs;
    }
    set indentWithTabs(value) {
        this.config.indentWithTabs = value;
    }

    get tabWidth() {
        return this._tabWidth;
    }
    set tabWidth(value: number) {
        this._tabWidth = value;
    }

    get expand() {
        return this.config.expand;
    }
    set expand(value) {
        this.config.expand = value;
    }

    private _tabWidth = 4;
}

export class EditorConfigModel {
    keyMap = 'default';
    lineNumbers = true;
    indentWithTabs = true;
    smartIndent = true;
    expand = false;
    tabSize = 4;
    indentUnit = 4;
    mode = 'text/x-csrc';
    viewportMargin = Infinity;
}
