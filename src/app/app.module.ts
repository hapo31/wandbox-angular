import { BrowserModule } from '@angular/platform-browser';
import { NgModel } from '@angular/forms';
import { NgModule, Pipe, Directive, Component } from '@angular/core';

import { AppComponent } from './app.component';
import { CodemirrorModule } from '@ng4/codemirror';

import { WandboxCodemirrorComponent } from './components/codemirror/wb-codemirror.component';

@NgModule({
    imports: [
        BrowserModule,
        CodemirrorModule
    ],
    declarations: [
        AppComponent,
        WandboxCodemirrorComponent
    ],
    exports: [
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
