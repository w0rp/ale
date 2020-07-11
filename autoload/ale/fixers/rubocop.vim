call ale#Set('ruby_rubocop_options', '')
call ale#Set('ruby_rubocop_executable', 'rubocop')

" Rubocop fixer outputs diagnostics first and then the fixed
" output. These are delimited by a "=======" string that we
" look for to remove everything before it.
function! ale#fixers#rubocop#PostProcess(buffer, output) abort
    let l:line = 0

    for l:output in a:output
        let l:line = l:line + 1

        if l:output =~# "^=\\+$"
            break
        endif
    endfor

    return a:output[l:line :]
endfunction

function! ale#fixers#rubocop#GetCommand(buffer) abort
    let l:executable = ale#Var(a:buffer, 'ruby_rubocop_executable')
    let l:config = ale#path#FindNearestFile(a:buffer, '.rubocop.yml')
    let l:options = ale#Var(a:buffer, 'ruby_rubocop_options')

    return ale#ruby#EscapeExecutable(l:executable, 'rubocop')
    \   . (!empty(l:config) ? ' --config ' . ale#Escape(l:config) : '')
    \   . (!empty(l:options) ? ' ' . l:options : '')
    \   . ' --auto-correct --force-exclusion --stdin '
    \   . ale#Escape(expand('#' . a:buffer . ':p'))
endfunction

function! ale#fixers#rubocop#Fix(buffer) abort
    return {
    \   'command': ale#fixers#rubocop#GetCommand(a:buffer),
    \   'process_with': 'ale#fixers#rubocop#PostProcess'
    \}
endfunction
