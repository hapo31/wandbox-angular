
export function mime(languageName: string) {
    return constants.EDITOR_MODE_MAPPING[languageName] || '';
}

// export class LanguageMimePipe implements PipeTransform {

//     transform(value: string) {
//         return EDITOR_MODE_MAPPING[value] || '';
//     }
// }

namespace constants {
    export const EDITOR_MODE_MAPPING = {
        'C++': 'text/x-c++src',
        'C': 'text/x-csrc',
        'CPP': 'text/x-csrc',
        'D': 'text/x-d',
        'Ruby': 'text/x-ruby',
        'Python': 'text/x-python',
        'Perl': 'text/x-perl',
        'Erlang': 'text/x-erlang',
        'C#': 'text/x-csharp',
        'Haskell': 'text/x-haskell',
        'Bash script': 'text/x-sh',
        'Lua': 'text/x-lua',
        'PHP': 'text/x-php',
        'Lisp': 'text/x-common-lisp',
        'Pascal': 'text/x-pascal',
        'Rust': 'text/x-rustsrc',
        'Java': 'text/x-java',
        'Groovy': 'text/x-groovy',
        'JavaScript': 'text/javascript',
        'CoffeeScript': 'text/x-coffeescript',
        'Elixir': 'text/x-ruby',
        'Scala': 'text/x-scala',
        'Vim script': 'text/x-csrc',
        'Swift': 'text/x-swift',
        'OCaml': 'text/x-ocaml',
        'Go': 'text/x-go',
        'Crystal': 'text/x-crystal',
        'OpenSSL': 'text/x-sh',
    };
}
