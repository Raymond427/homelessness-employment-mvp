import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TextInput from './Text'
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

const Field = ({ id, type, labelText, required, errorMessage, input, addToInValidFields, removeFromInValidFields, submissionAttempted, ...props }) => {
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

    const Input = input

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
    input: PropTypes.func.isRequired
}

export const TextField = ({ type = 'text', ...props }) => (
    <Field type={type} input={TextInput} {...props} />
)

export const TextAreaField = props => (
    <Field type='textarea' input={TextInput} {...props} />
)

export const EmailField = props => (
    <Field
        type='email'
        id='email'
        input={TextInput}
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
        input={TextInput}
        placeholder='Password'
        pattern={/^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}/}
        errorMessage='Password must be between 4 and 8 digits long and include at least one numeric digit'
        required
        {...props}
    />
)

export const SelectField = props => (
    <Field input={SelectInput} {...props} />
)

export const CheckboxField = props => (
    <Field input={Checkboxes} {...props} />
)

export const RadioField = props => (
    <Field input={RadioInput} {...props} />
)

export const RatingField = props => (
    <Field input={RatingInput} {...props} />
)