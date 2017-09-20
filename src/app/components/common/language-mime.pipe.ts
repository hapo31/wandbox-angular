import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'language-mime' })
export class LanguageMimePipe implements PipeTransform {
    transform(value: string) {

    }
}
