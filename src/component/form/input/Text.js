import React, { useState, useEffect } from 'react'

const TextInput = ({ id, errorMessage, pattern, required, autoCompleteValues, initialValue, showErrors, onBlur, onValid, onInValid, valueHook, type, ...props }) => {
    const [ value, setValue ] = useState(initialValue || '')
    const isValid = () => {
        if (required && (!value || value === '')) {
            return false
        } else if (pattern) {
            return pattern.test(value)
        } else {
            return true
        }
    }

    useEffect(() => {
        valueHook(value)
        isValid() ? onValid() : onInValid()
    }, [ value ])

    const dataListName = autoCompleteValues ? `${id}__datalist` : ''

    const textClassName = type === 'textarea'
        ? `input text-area__input${showErrors ? ` text-area__input--invalid` : ''}`
        : `input text__input${showErrors ? ` text__input--invalid` : ''}`

    const inputProps = {
        className: textClassName,
        id,
        name: id,
        list: dataListName,
        onBlur: () => onBlur(isValid()),
        onChange: event => setValue(event.target.value),
        value
    }

    return (
        <>
            {type === 'textarea' ? <textarea {...inputProps} {...props} /> : <input type={type} {...inputProps} {...props} />}
            {autoCompleteValues &&
                <datalist className='text__datalist' id={dataListName}>
                    {autoCompleteValues.map((value, idx) =>
                        <option key={`${id}-${value}__${idx}`}>
                            {value}
                        </option>)}
                </datalist>
            }
        </>
    )
}

export default TextInput