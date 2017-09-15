
/**
 * Model for EditorComponent
 *
 * @export
 * @class EditorModel
 */
export class EditorModel {
    config: EditorConfigModel = new EditorConfigModel();

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

    private _tabWidth: number = 4;
}

export class EditorConfigModel {
    keyMap: string = 'default';;
    lineNumbers: boolean = true;
    indentWithTabs: boolean = true;
    smartIndent: boolean = true;
    expand: boolean = false;
    tabSize: number = 4;
    indentUnit: number = 4;
    mode: string = 'text/x-csrc';
}