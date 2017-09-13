import { Component } from '@angular/core';

@Component({
  selector: 'wandbox-codemirror',
  template: `
      <codemirror [(value)]="code"
      [config]="{lineNumbers: true}"
      >
      </codemirror>
  `
})
export class WandboxCodemirrorComponent {
  code: string;
  constructor() {
    this.code = 'hogehoge';
  }
}
