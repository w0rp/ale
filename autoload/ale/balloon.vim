" Author: w0rp <devw0rp@gmail.com>
" Description: balloonexpr support for ALE.

function! ale#balloon#MessageForPos(bufnr, lnum, col) abort
    " Don't show balloons if they are disabled, or linting is disabled.
    if !ale#Var(a:bufnr, 'set_balloons')
    \|| !g:ale_enabled
    \|| !getbufvar(a:bufnr, 'ale_enabled', 1)
        return ''
    endif

    let l:loclist = get(g:ale_buffer_info, a:bufnr, {'loclist': []}).loclist
    let l:index = ale#util#BinarySearch(l:loclist, a:bufnr, a:lnum, a:col)

    return l:index >= 0 ? l:loclist[l:index].text : ''
endfunction

function! ale#balloon#Expr() abort
    return ale#balloon#MessageForPos(v:beval_bufnr, v:beval_lnum, v:beval_col)
endfunction

function! ale#balloon#HoverExpr() abort
    " TODO : Find a way with ale#hover API to just extract the message, given
    " beval_bufnr, beval_lnum, beval_col.
    " Note : Termdebug uses beval_text
    return 'Test'
endfunction

function! ale#balloon#Disable() abort
    if !has('balloon_eval') && !has('balloon_eval_term')
        finish
    endif

    if has('balloon_eval')
        set noballooneval
    endif

    if has('balloon_eval_term')
        set noballoonevalterm
    endif

    set balloonexpr=
endfunction

function! ale#balloon#Enable() abort
    if !has('balloon_eval') && !has('balloon_eval_term')
        finish
    endif

    if has('balloon_eval')
        set ballooneval
    endif

    if has('balloon_eval_term')
        set balloonevalterm
    endif

    set balloonexpr=ale#balloon#Expr()
endfunction
