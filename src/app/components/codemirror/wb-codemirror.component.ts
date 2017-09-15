import {
    Component,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    AfterViewInit
} from '@angular/core';

import { EditorConfigModel } from '../editor/editor.model';
import { EditorService } from '../editor/editor.service';

declare const CodeMirror: any;

@Component({
    selector: 'wandbox-codemirror',
    template: `
        <textarea #host></textarea>
  `
})
export class WandboxCodemirrorComponent implements AfterViewInit {

    @Input() code: string;
    @Input() config: EditorConfigModel = new EditorConfigModel();

    @Output() blur = new EventEmitter<void>();
    @Output() focus = new EventEmitter<void>();
    @Output() change = new EventEmitter<void>();

    @ViewChild('host') host;

    private codemirror: any = null;

    constructor(private service: EditorService) {
        this.code = 'struct';
        service.changeConfig$.subscribe(v => {
            this.codemirror.setOption(v.name, v.value);
        });
    }

    ngAfterViewInit(): void {
        this.codemirrorInit(this.config);
    }

    codemirrorInit(config: EditorConfigModel) {
        this.codemirror = CodeMirror.fromTextArea(this.host.nativeElement, config);
        this.codemirror.setValue(this.code);
        this.codemirror.on('change', () => {
            this.code = this.codemirror.getValue();
            this.change.emit();
        });

        this.codemirror.on('focus', () => {
            this.focus.emit();
        });

        this.codemirror.on('blur', () => {
            this.blur.emit();
        });

        this.codemirror.setOption('extraKeys', {
            Tab: (cm) => {
                if (cm.somethingSelected()) {
                    cm.execCommand('indentMore');
                    return;
                }
                if (this.config.indentWithTabs) {
                    cm.execCommand('insertTab');
                } else {
                    const tabSize = cm.getOption('tabSize');
                    const spaces = Array(cm.getOption('tabSize') + 1).join(' ');
                    cm.replaceSelection(spaces, 'end', '+input');
                }
            },
            "Shift-Tab": (cm) => {
                cm.execCommand("indentLess");
              }
        });
    }
}
