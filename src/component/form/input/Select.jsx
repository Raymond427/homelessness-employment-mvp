import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const SelectInput = ({ id, options, errorMessage, labelText, required, showErrors, placeholder, initialValue, onBlur, onValid, onInValid, valueHook, ...props }) => {
    const [ value, setValue ] = useState(initialValue || '')
    const isValid = () => !(required && (!value || value === ''))

    useEffect(() => valueHook(value), [ value ])
    
    useEffect(() => {
        valueHook(value)
        isValid() ? onValid() : onInValid()
    }, [])

    return (
        <select
            className={`input select__input ${showErrors ? `select__input--invalid select__input` : 'select__input'}`}
            defaultValue={value}
            id={id}
            onBlur={() => onBlur(isValid())}
            onChange={event => setValue(event.target.value)}
            {...props}
        >
            {
                [ { value: '', text: placeholder }, ...options ]
                    .map(({ value, text }, idx) =>
                        <option value={value} key={`${value}-${idx}`}>
                            {text}
                        </option>
                    )
            }
        </select>
    )
}

SelectInput.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
        })
    ).isRequired
}

export default SelectInput