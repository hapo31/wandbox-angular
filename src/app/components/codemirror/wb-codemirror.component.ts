/// <reference path='../../../../node_modules/@types/codemirror/index.d.ts' />

declare let CodeMirror;

import {
    Component,
    Input,
    Output,
    ElementRef,
    EventEmitter,
    ViewChild,
    AfterViewInit
} from '@angular/core';

import { EditorConfigModel } from '../editor/editor.model';
import { EditorService } from '../editor/editor.service';

@Component({
    selector: 'wandbox-codemirror',
    styles: [`
        textarea {
            display: none;
        }
    `],
    template: `
        <textarea #host></textarea>
  `
})
export class WandboxCodemirrorComponent implements AfterViewInit {

    @Input() value: string;
    @Input() config: EditorConfigModel = new EditorConfigModel();

    @Output() blur = new EventEmitter<void>();
    @Output() focus = new EventEmitter<void>();
    @Output() change = new EventEmitter<string>();

    @Output() compileCommand = new EventEmitter<void>();

    @ViewChild('host') host;

    private codemirror: CodeMirror.Editor = null;

    constructor(private service: EditorService, private element: ElementRef) {
        service.changeConfig$.subscribe(v => {
            this.codemirror.setOption(v.name, v.value);
        });

        service.changeEditorTab$.subscribe(v => {
            this.value = v;
            this.codemirror.setValue(v);
        });
    }

    ngAfterViewInit(): void {
        this.codemirrorInit(this.config);
        const codeMirror = (this.element.nativeElement as HTMLElement);
        codeMirror.classList.add('cm-s-user');
    }

    private codemirrorInit(config: EditorConfigModel) {
        this.codemirror = CodeMirror.fromTextArea(this.host.nativeElement, config);
        this.codemirror.setValue(this.value);
        this.codemirror.on('change', () => {
            this.value = this.codemirror.getValue();
            this.change.emit(this.value);
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
            'Shift-Tab': (cm) => {
                cm.execCommand('indentLess');
            },
            'Ctrl-Enter': (cm) => {
                this.compileCommand.emit();
            },
        });
    }
}
