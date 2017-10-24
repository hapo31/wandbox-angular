import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { CompileResponse } from './compile.model';

@Injectable()
export class PermlinkService {

    subject = new Subject<CompileResponse>();

    constructor(private route: ActivatedRoute) {

    }
}
