import {
    Component,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    AfterViewInit
} from '@angular/core';

import { CodemirrorComponent } from '@ng4/codemirror';
import { EditorConfigModel } from '../editor/editor.model';
import { EditorService } from '../editor/editor.service';

@Component({
    selector: 'wandbox-codemirror',
    template: `
        <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.24.2/keymap/vim.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.24.2/keymap/emacs.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.24.2/codemirror.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.24.2/addon/mode/simple.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.24.2/mode/clike/clike.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.24.2/mode/d/d.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.24.2/mode/ruby/ruby.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.24.2/mode/python/python.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.24.2/mode/perl/perl.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.24.2/mode/erlang/erlang.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.24.2/mode/haskell/haskell.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.24.2/mode/shell/shell.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.24.2/mode/lua/lua.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.24.2/mode/php/php.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.24.2/mode/commonlisp/commonlisp.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.24.2/mode/pascal/pascal.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.24.2/mode/rust/rust.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.24.2/mode/groovy/groovy.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.24.2/mode/javascript/javascript.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.24.2/mode/coffeescript/coffeescript.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.24.2/mode/swift/swift.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.24.2/mode/mllike/mllike.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.24.2/mode/go/go.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.24.2/mode/crystal/crystal.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.24.2/addon/search/searchcursor.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.24.2/addon/edit/matchbrackets.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.24.2/addon/dialog/dialog.min.js"></script>
        <codemirror [(value)]="code"
            [config]="config"
            (change)="change.emit()"
            (blur)="blur.emit()"
            (focus)="focus.emit()"
        >
        </codemirror>
  `
})
export class WandboxCodemirrorComponent implements AfterViewInit {

    code: string;
    @Input() config: EditorConfigModel = new EditorConfigModel();

    @Output() blur = new EventEmitter<void>();
    @Output() focus = new EventEmitter<void>();
    @Output() change = new EventEmitter<void>();

    @ViewChild(CodemirrorComponent) codemirror: CodemirrorComponent;

    constructor(private service: EditorService) {
        this.code = `#include <stdio.h>
int main() {
    printf("hello, world!");
}`;
        service.changeConfig$.subscribe(v => {
            this.codemirror.instance.setOption(v.name, v.value);
        });
    }

    ngAfterViewInit(): void {
        this.codemirror.instance.setOption('extraKeys', {
            Tab: (cm) => {
                if (cm.somethingSelected()) {
                    cm.execCommand('indentMore');
                    return;
                }
                if (this.config.indentWithTabs) {
                    cm.execCommand('insertSoftTab');
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
