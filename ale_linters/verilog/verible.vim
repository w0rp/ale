" Verible verilog linter from Google (https://github.com/google/verible)
" Maintained by Aman Mehra (https://github.com/amanvm)

if !exists('g:ale_verilog_verible_options')
    let g:ale_verilog_verible_options = ''
endif

function! ale_linters#verilog#verible#GetCommand(buffer) abort
    let l:filename = tempname() . '_verible_linted.sv'

    " Create a special filename, so we can detect it in the handler.
    call ale#command#ManageFile(a:buffer, l:filename)
    let l:lines = getbufline(a:buffer, 1, '$')
    call ale#util#Writefile(a:buffer, l:lines, l:filename)

    return 'verible-verilog-lint '
    \   . ale#Var(a:buffer, 'verilog_verible_options') .' '
    \   . ale#Escape(l:filename)
endfunction

function! ale_linters#verilog#verible#Handle(buffer, lines) abort
    " Look for lines like the following.
    " Patterns:
    "   Style warnings
    "       filename.sv:7:13: Explicitly define static or automatic lifetime for non-class functions [Style: function-task-explicit-lifetime] [explicit-function-lifetime]
    "   Syntax errors
    "       filename.v:39:4: syntax error, rejected "endcase" (syntax-error).
    let l:pattern = '\([A-z0-9_\-\/ ]\+\.v\|[A-z0-9_\-\/ ]\+\.sv\):\(\d\+\):\(\d\+\):\(.*\s\+\)\([Style:.*\|(syntax-error.*\)'
    let l:output = []
    for l:match in ale#util#GetMatches(a:lines, l:pattern)
        let l:file = l:match[1]
        let l:lnum = l:match[2]
        let l:col = l:match[3]
        let l:text = l:match[4]
        let l:type = l:match[5]
        if l:type =~# '^[Style.*'
            call add(l:output, {'lnum': l:lnum,'col':l:col,'text': l:text . l:type,'type': 'W'})
        elseif l:type =~# '^(syntax-error.*'
            call add(l:output, {'lnum': l:lnum,'col':l:col,'text': l:text . l:type ,'type': 'E'})
        else
            call add(l:output, {'lnum': l:lnum,'col':l:col,'text': l:text . l:type,'type': 'I'})
        end
    endfor

    return l:output
endfunction

call ale#linter#Define('verilog', {
\   'name': 'verible',
\   'output_stream': 'stdout',
\   'executable': 'verible-verilog-lint',
\   'command': function('ale_linters#verilog#verible#GetCommand'),
\   'callback': 'ale_linters#verilog#verible#Handle',
\   'read_buffer': 0,
\})
