" Author: Anderson Danilo <contact@andersondanilo.com>
" Description: Fixing brightscript files with bsfmt.

call ale#Set('bsfmt_fixer_executable', 'bsfmt')
call ale#Set('bsfmt_fixer_use_global', get(g:, 'ale_use_global_executables', 0))
call ale#Set('bsfmt_fixer_options', '')

function! ale#fixers#bsfmt_fixer#GetExecutable(buffer) abort
    return ale#path#FindExecutable(a:buffer, 'bsfmt_fixer', [
    \   'node_modules/brighterscript-formatter/dist/cli.js',
    \   'bsfmt'
    \])
endfunction

function! ale#fixers#bsfmt_fixer#Fix(buffer) abort
    let l:executable = ale#fixers#bsfmt_fixer#GetExecutable(a:buffer)

    return {
    \   'command': ale#Escape(l:executable)
    \       . ' ' . ale#Var(a:buffer, 'bsfmt_fixer_options')
    \       . ' --write %t',
    \   'read_temporary_file': 1,
    \}
endfunction
