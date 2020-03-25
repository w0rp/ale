" Author: Horacio Sanson https://github.com/hsanson
" Description: Functions for integrating with Go tools

" Find the nearest "project root" based on the presence of a go.mod file, a
" .git directory, GOPATH environment variable, or default ~/go path.
function! ale#go#FindProjectRoot(buffer) abort
    if ale#Var(a:buffer, 'go_go111module') isnot# 'off'
        let l:path_dir = ale#path#FindNearestFile(a:buffer, 'go.mod')

        if !empty(l:path_dir)
            return fnamemodify(l:path_dir, ':h')
        endif
    endif

    if !empty($GOPATH)
        let l:sep = has('win32') ? ';' : ':'
        let l:filename = ale#path#Simplify(expand('#' . a:buffer . ':p'))

        for l:name in split($GOPATH, l:sep)
            let l:path_dir = ale#path#Simplify(l:name)

            " Use the directory from GOPATH if the current filename starts with it.
            if l:filename[: len(l:path_dir) - 1] is? l:path_dir
                return l:path_dir
            endif
        endfor
    endif

    let l:default_go_path = ale#path#Simplify(expand('~/go'))

    if isdirectory(l:default_go_path)
        return l:default_go_path
    endif

    let l:path_dir = ale#path#FindNearestDirectory(a:buffer, '.git')

    if !empty(l:path_dir)
        return fnamemodify(l:path_dir, ':h:h')
    endif

    return ''
endfunction


call ale#Set('go_go111module', '')

" Return a string setting Go-specific environment variables
function! ale#go#EnvString(buffer) abort
    let l:env = ''

    " GO111MODULE - turn go modules behavior on/off
    let l:go111module = ale#Var(a:buffer, 'go_go111module')

    if !empty(l:go111module)
        let l:env = ale#Env('GO111MODULE', l:go111module) . l:env
    endif

    return l:env
endfunction
