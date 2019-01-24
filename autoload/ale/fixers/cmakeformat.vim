" Author: Attila Maczak <attila@maczak.hu>
" Description: Integration of cmakeformat with ALE.

call ale#Set('cmake_cmakeformat_executable', 'cmake-format')
call ale#Set('cmake_cmakeformat_options', '')

function! ale#fixers#cmakeformat#Fix(buffer) abort
    :echom "HII"
    let l:executable = ale#Var(a:buffer, 'cmake_cmakeformat_executable')
    let l:options = ale#Var(a:buffer, 'cmake_cmakeformat_options')

    return {
    \   'command': ale#Escape(l:executable)
    \       . ' -i '
    \       . (empty(l:options) ? '' : ' ' . l:options)
    \       . ' %t',
    \   'read_temporary_file': 1,
    \}
endfunction
