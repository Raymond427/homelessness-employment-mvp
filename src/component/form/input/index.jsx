import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TextInput, { MoneyInput } from './Text'
import SelectInput from './Select'
import Checkboxes from './Checkbox'
import RadioInput from './Radio'
import RatingInput from './Rating'
import '../../../styles/Input.css'

const Label = ({ htmlFor, labelText, required }) => (
    <label className='field-label' id={`${htmlFor}-label`} htmlFor={htmlFor}>
        {labelText}
        {required && <abbr className='field-label-required' title='This field is mandatory'>*</abbr>}
    </label>
)

Label.propTypes = {
    htmlFor: PropTypes.string,
    labelText: PropTypes.string.isRequired,
    required: PropTypes.bool
}

const ErrorMessage = ({ id, errorMessage }) => (
    <small className='field-error' id={`${id}-error`}>{errorMessage}</small>
)

ErrorMessage.propTypes = {
    id: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired
}

const Field = ({ id, type, labelText, required, errorMessage, Input, addToInValidFields, removeFromInValidFields, submissionAttempted, ...props }) => {
    const [ valid, setValidity ] = useState(true)
    const [ touched, setTouched ] = useState(false)

    const showErrors = !valid && (touched || submissionAttempted)

    const onInValid = () => {
        setValidity(false)
        addToInValidFields(id)
    }

    const onValid = () => {
        setValidity(true)
        removeFromInValidFields(id)
    }
    
    const onBlur = valid => {
        setTouched(true)
        valid ? onValid() : onInValid()
    }

    return (
        <div className='field' id={`${id}-field`}>
            {labelText && <Label htmlFor={id} labelText={labelText} required={required} />}
            {showErrors && errorMessage && <ErrorMessage id={id} errorMessage={errorMessage} />}
            <Input type={type} id={id} onBlur={onBlur} required={required} showErrors={showErrors} onInValid={onInValid} onValid={onValid} {...props} />
        </div>
    )
}

Field.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    labelText: PropTypes.string,
    required: PropTypes.bool,
    errorMessage: PropTypes.string,
    Input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired
}

export const TextField = ({ type = 'text', ...props }) => (
    <Field type={type} Input={TextInput} {...props} />
)

export const USDField = props => (
    <Field Input={MoneyInput} {...props} />
)

export const TextAreaField = props => (
    <Field type='textarea' Input={TextInput} {...props} />
)

export const EmailField = props => (
    <Field
        type='email'
        id='email'
        Input={TextInput}
        placeholder='Email'
        pattern={/^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/}
        errorMessage='Please enter a valid email address'
        required
        {...props}
    />
)

export const PasswordField = props => (
    <Field
        type='password'
        id='password'
        Input={TextInput}
        placeholder='Password'
        pattern={/^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}/}
        errorMessage='Password must be between 4 and 8 digits long and include at least one numeric digit'
        required
        {...props}
    />
)

export const SelectField = props => (
    <Field Input={SelectInput} {...props} />
)

export const CheckboxField = props => (
    <Field Input={Checkboxes} {...props} />
)

export const RadioField = props => (
    <Field Input={RadioInput} {...props} />
)

export const RatingField = props => (
    <Field Input={RatingInput} {...props} />
)