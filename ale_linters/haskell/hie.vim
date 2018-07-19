" Author: Luxed <devildead13@gmail.com>
" Description: A language server for Haskell

call ale#Set('haskell_hie_executable', 'hie')

function! ale_linters#haskell#hie#GetExecutable(buffer) abort
    return ale#Var(a:buffer, 'haskell_hie_executable')
endfunction

function! ale_linters#haskell#hie#GetCommand(buffer) abort
    let l:executable = ale_linters#haskell#hie#GetExecutable(a:buffer)
    let l:arguments = '--lsp'

    return ale#Escape(l:executable) . ' ' . l:arguments
endfunction

function! ale_linters#haskell#hie#GetProjectRoot(buffer) abort
    let l:stack_file = ale#path#FindNearestFile(a:buffer, 'stack.yaml')

    return !empty(l:stack_file) ? fnamemodify(l:stack_file, ':h') : ''
endfunction

call ale#linter#Define('haskell', {
\   'name': 'hie',
\   'lsp': 'stdio',
\   'executable_callback': 'ale_linters#haskell#hie#GetExecutable',
\   'command_callback': 'ale_linters#haskell#hie#GetCommand',
\   'project_root_callback': 'ale_linters#haskell#hie#GetProjectRoot',
\})
