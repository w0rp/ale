" Author: Francis Agyapong <francisgyapong2@gmail.com>
" Description: A linter for the Kotlin programming language that uses kotlinc

let g:ale_kotlin_kotlinc_options = get(g:, 'ale_kotlin_kotlinc_options', '')
let g:ale_kotlin_kotlinc_enable_config = get(g:, 'ale_kotlin_kotlinc_enable_config', 0)
let g:ale_kotlin_kotlinc_config_file = get(g:, 'ale_kotlin_kotlinc_config_file', '.ale_kotlinc_config')
let g:ale_kotlin_kotlinc_classpath = get(g:, 'ale_kotlin_kotlinc_classpath', '')
let g:ale_kotlin_kotlinc_sourcepath = get(g:, 'ale_kotlin_kotlinc_sourcepath', '')
let g:ale_kotlin_kotlinc_use_module_file = get(g:, 'ale_kotlin_kotlinc_use_module_file', 0)
let g:ale_kotlin_kotlinc_module_filename = get(g:, 'ale_kotlin_kotlinc_module_filename', 'module.xml')

function! ale_linters#kotlin#kotlinc#GetCommand(buffer)
    let l:kotlinc_opts = g:ale_kotlin_kotlinc_options
    let l:command = 'kotlinc '

    " If the config file is enabled and readable, source it
    if g:ale_kotlin_kotlinc_enable_config
        if filereadable(expand(g:ale_kotlin_kotlinc_config_file, 1))
            execute 'source ' . fnameescape(expand(g:ale_kotlin_kotlinc_config_file, 1))
        endif
    endif

    " If use module and module file is readable use that and return
    if g:ale_kotlin_kotlinc_use_module_file
        let l:module_filename = fnameescape(expand(g:ale_kotlin_kotlinc_module_filename, 1))

        if filereadable(l:module_filename)
            let l:kotlinc_opts .= ' -module ' . l:module_filename
            let l:command .= 'kotlinc ' . l:kotlinc_opts

            return l:command
        endif
    endif

    " We only get here if not using module or the module file not readable
    if g:ale_kotlin_kotlinc_classpath !=# ''
        let l:kotlinc_opts .= ' -cp ' . g:ale_kotlin_kotlinc_classpath
    endif

    let l:fname = ''

    if g:ale_kotlin_kotlinc_sourcepath !=# ''
        let l:fname .= expand(g:ale_kotlin_kotlinc_sourcepath, 1) . ' '
    endif
    let l:fname .= shellescape(expand('%', 1))
    let l:command .= l:kotlinc_opts . ' ' . l:fname

    return l:command
endfunction

function! ale_linters#kotlin#kotlinc#Handle(buffer, lines)
    let l:code_pattern = '^\(.*\):\([0-9]\+\):\([0-9]\+\):\s\+\(error\|warning\):\s\+\(.*\)'
    let l:general_pattern = '^\(warning\|error\|info\):\s*\(.*\)'
    let l:output = []

    for l:line in a:lines
        let l:match = matchlist(l:line, l:code_pattern)

        if len(l:match) == 0
            continue
        endif

        let l:file = l:match[1]
        let l:line = l:match[2] + 0
        let l:column = l:match[3] + 0
        let l:type = l:match[4]
        let l:text = l:match[5]

        let l:bufnr = bufnr(l:file)
        let l:curbufnr = bufnr('%')

        " Skip if file is not loaded
        if l:bufnr == -1 || l:bufnr != l:curbufnr
            continue
        endif
        let l:type_marker_str = l:type ==# 'warning' ? 'W' : 'E'

        call add(l:output, {
        \   'bufnr': l:bufnr,
        \   'lnum': l:line,
        \   'vcol': 0,
        \   'col': l:column,
        \   'text': l:text,
        \   'type': l:type_marker_str,
        \   'nr': -1,
        \})
    endfor

    " Non-code related messages
    for l:line in a:lines
        let l:match = matchlist(l:line, l:general_pattern)

        if len(l:match) == 0
            continue
        endif

        let l:type = l:match[1]
        let l:text = l:match[2]

        let l:type_marker_str = l:type ==# 'warning' || l:type ==# 'info' ? 'W' : 'E'

        call add(l:output, {
        \   'bufnr': 0,
        \   'lnum': -1,
        \   'vcol': 0,
        \   'col': -1,
        \   'text': l:text,
        \   'type': l:type_marker_str,
        \   'nr': -1,
        \})
    endfor

    return l:output
endfunction

call ale#linter#Define('kotlin', {
\   'name': 'kotlinc',
\   'output_stream': 'stderr',
\   'executable': 'kotlinc',
\   'command_callback': 'ale_linters#kotlin#kotlinc#GetCommand',
\   'callback': 'ale_linters#kotlin#kotlinc#Handle',
\})
