" Author: Cian Butler https://github.com/butlerx
" Description: msgfmt for PO files

function! ale_linters#po#msgfmt#Handle(buffer, lines) abort
    " Example output:
    " /tmp/vpqkkrq/1/sv.po:465: a format specification for argument '0' doesn't exist in 'msgstr'
    let l:pattern = '^[^:]\+:\(\d\+\):\s*\(.\+\)'
    let l:output = []

    for l:match in ale#util#GetMatches(a:lines, l:pattern)
        call add(l:output, {
        \   'lnum': l:match[1] + 0,
        \   'text': l:match[2],
        \   'type': 'E',
        \})
    endfor

    return l:output

endfunction

call ale#linter#Define('po', {
\   'name': 'msgfmt',
\   'executable': 'msgfmt',
\   'output_stream': 'stderr',
\   'command': 'msgfmt --check-format --output-file=- %t',
\   'callback': 'ale_linters#po#msgfmt#Handle',
\})
