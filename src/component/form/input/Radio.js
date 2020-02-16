import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const RadioInput = ({ options, id, initialValue, showErrors, name, required, onBlur, onValid, onInValid, valueHook }) => {
    const [ selectedValue, selectButton ] = useState(initialValue || null)
    const isValid = () => required ? selectedValue : true

    useEffect(() => valueHook(selectedValue), [ selectedValue ])
    
    useEffect(() => {
        valueHook(selectedValue)
        isValid() ? onValid() : onInValid()
    }, [])

    return (
        <div id={id} className={`${showErrors ? `radio__wrapper--invalid radio__wrapper` : 'radio__wrapper'}`} onBlur={() => onBlur(isValid())} >
            {
                options.map(
                    ({ value, text }, idx) => (
                        <span key={`input-${value}-${idx}`} className="radio__span" id={`radio__span-${id}`}>
                            <input type='radio' className='radio__input' id={value} name={name} value={text} onClick={() => selectButton(value)} defaultChecked={initialValue === value} />
                            <label className='radio__label' id={`radio__label-${id}`} htmlFor={value}>{text}</label>
                        </span>
                    )
                )
            }
        </div>
    )
}

RadioInput.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
        })
    ).isRequired
}

export default RadioInput