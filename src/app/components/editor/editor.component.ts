import { Component, OnInit } from '@angular/core';

import { EditorModel } from './editor.model';

import { EditorService } from './editor.service';


@Component({
    selector: 'wandbox-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css'],
    providers: [EditorService]
})
export class EditorComponent implements OnInit {

    model: EditorModel = new EditorModel();

    constructor(private service: EditorService) { }

    ngOnInit() {

    }


    changeConfig(configName: string, value: string | number) {
        console.log(configName, value);
        this.service.changeConfigNext$({
            name: configName,
            value: value
        });
    }

}
