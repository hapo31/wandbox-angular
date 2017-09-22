import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { NgModule, Pipe, Directive, Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { WandboxCodemirrorComponent } from './components/codemirror/wb-codemirror.component';
import { EditorComponent } from './components/editor/editor.component';
import { HeaderComponent } from './components/header/header.component';
import { SponsorsComponent } from './components/sponsors/sponsors.component';
import { CompilerComponent } from './components/compiler/compiler.component';
import { CompileComponent } from './components/compile/compile.component';
import { TabComponent } from './components/tab/tab.component';


import { CompilerService } from './components/compiler/compiler.service';
import { CompilerListAPIService } from './components/api/compiler-list.service';
import { TemplateAPIService } from './components/api/template.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
    ],
    declarations: [
        AppComponent,
        WandboxCodemirrorComponent,
        EditorComponent,
        HeaderComponent,
        SponsorsComponent,
        CompilerComponent,
        CompileComponent,
        TabComponent
    ],
    exports: [
    ],
    providers: [TemplateAPIService, CompilerListAPIService, CompilerService],
    bootstrap: [AppComponent]
})
export class AppModule { }
