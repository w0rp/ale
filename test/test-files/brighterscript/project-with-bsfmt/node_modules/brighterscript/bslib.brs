' Utility functions for the BrighterScript language

'
' Convert a value into a string. For non-primitive values, this will return the type instead of its value in most cases.
' @param dynamic value - the value to be turned into a string.
' @return string - the string representation of `value`
'
function bslib_toString(value)
    valueType = type(value)
    'if the var supports `toStr()`
    if valueType = "<uninitialized>" then
        return valueType
    else if value = invalid then
        return "<invalid>"
    else if GetInterface(value, "ifToStr") <> invalid then
        return value.toStr()
    else if valueType = "roSGNode"
        return "Node(" + value.subType() + ")"
    end if
    'TODO add class name for objects once we have reflection implemented

    'when all else fails, just return the type
    return "<" + valueType + ">"
end function