import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const CheckBox = ({ value, index, name, addToCheckedBoxes, removeFromCheckedBoxes, initiallyChecked }) => {
    const onClick = ({ target: { checked } }) => checked ? addToCheckedBoxes(value) : removeFromCheckedBoxes(value)

    return (
        <input key={`input-${value}-${index}`} type='checkbox' className='checkbox__input' id={value} name={name} value={value} onClick={onClick} defaultChecked={initiallyChecked} />
    )
}

const Checkboxes = ({ options, id, required, className, initialValues, onValid, onInValid, onBlur, valueHook }) => {
    const [ checkedBoxes, setCheckedBoxes ] = useState(initialValues || [])
    const isValid = () => !(required && checkedBoxes.length === 0)

    const addToCheckedBoxes = name => setCheckedBoxes([ name, ...checkedBoxes ])
    const removeFromCheckedBoxes = name => setCheckedBoxes(checkedBoxes.filter(boxName => boxName !== name))

    useEffect(() => valueHook(checkedBoxes), [ checkedBoxes ])
    
    useEffect(() => {
        valueHook(checkedBoxes)
        isValid() ? onValid() : onInValid()
    }, [])

    return (
        <div onBlur={() => onBlur(isValid())} id={id} className={className}>
            {options.map(({ value, text }, idx) =>
                <span key={`label-${value}-${idx}`}>
                    <CheckBox value={value} index={idx} name={value} addToCheckedBoxes={addToCheckedBoxes} initiallyChecked={checkedBoxes.indexOf(value) > -1} removeFromCheckedBoxes={removeFromCheckedBoxes} />
                    <label htmlFor={value}>{text}</label>
                </span>
            )}
        </div>
    )
}

Checkboxes.propTypes = {
    initiallyChecked: PropTypes.arrayOf(
        PropTypes.string
    ),
    options: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
        })
    ).isRequired
}

export default Checkboxes