import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { NgModule, Pipe, Directive, Component } from '@angular/core';

import { AppComponent } from './app.component';
import { CodemirrorModule } from '@ng4/codemirror';

import { WandboxCodemirrorComponent } from './components/codemirror/wb-codemirror.component';
import { EditorComponent } from './components/editor/editor.component';
import { HeaderComponent } from './components/header/header.component';
import { SponsorsComponent } from './components/sponsors/sponsors.component';
import { CompilerComponent } from './components/compiler/compiler.component';
import { CompileComponent } from './components/compile/compile.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CodemirrorModule
    ],
    declarations: [
        AppComponent,
        WandboxCodemirrorComponent,
        EditorComponent,
        HeaderComponent,
        SponsorsComponent,
        CompilerComponent,
        CompileComponent
    ],
    exports: [
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
