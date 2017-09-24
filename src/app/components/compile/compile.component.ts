import { Component, OnInit } from '@angular/core';
import { CompileService } from '../api/compile.service';

@Component({
  selector: 'wandbox-compile',
  templateUrl: './compile.component.html',
  styleUrls: ['./compile.component.css']
})
export class CompileComponent implements OnInit {

  constructor(private apiService: CompileService) { }

  ngOnInit() {
  }

  postCompile() {
      this.apiService.postCompile({
          code: `#include <iostream>
          int main() {
              std::cout << "hello, world" << std::endl;
          }
          `,
          codes: [],
          compiler: 'gcc-head',
          options: 'gnu++1y',
          save: false,
          stdin: '',
          'compiler-option-raw': '',
          'runtime-option-raw': ''
      }).subscribe(v => {
        console.log(v);
      });
  }

}
