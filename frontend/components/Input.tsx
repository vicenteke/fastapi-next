"use client";

// TODO: implement other types of input, including select, radio, checkbox

import React, { useState } from "react";
import Icon from "./Icon";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import {
  BulmaColors,
  BulmaSizes,
  BulmaStates,
  InputTypes
} from "@/constants/types";


export interface Props extends React.ComponentPropsWithoutRef<'input'> {
  type: InputTypes
  color?: BulmaColors
  inputSize?: BulmaSizes
  state?: BulmaStates
  label?: string
  validate?: (data: any) => boolean
  helpText?: string
  successText?: string
  errorText?: string
  iconLeft?: React.ReactNode | IconDefinition
  iconRight?: React.ReactNode | IconDefinition
};


/* Description: Bulma input wrapper.
 * Props:
 * - type: input type;
 * - color: Bulma color;
 * - inputSize: Bulma size;
 * - state: Bulma state;
 * - label: input label;
 * - validate: method to validate the input;
 * - helpText: help text below the input;
 * - successText: success text below the input;
 * - errorText: error text below the input;
 * - iconLeft: left icon;
 * - iconRight: right icon;
 */
function Input({
  value,
  inputSize,
  type,
  onChange,
  label,
  validate,
  helpText,
  successText,
  errorText,
  iconLeft,
  iconRight,
  ...props
}: Props) {
  if (type === 'none')
    return <></>

  const [inputValue, setInputValue] = useState<any>(value || '');
  const [validation, setValidation] = useState<boolean | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange)
    onChange(event);
    if (validate)
    setValidation(validate(event.target.value));
    setInputValue(event.target.value);
  }

  if (type === 'hidden')
    return <input
      type={type}
      value={inputValue}
      onChange={handleChange}
      {...props}
    />

  let inputClasses = ['input'];
  if (validation === true) inputClasses.push('is-success');
  if (validation === false) inputClasses.push('is-danger');
  if (props.readOnly) inputClasses.push('is-static');
  
  let controlClasses = ['control'];
  if (iconLeft) controlClasses.push('has-icons-left');
  if (iconRight) controlClasses.push('has-icons-right');
  if (inputSize) {
    inputClasses.push(`is-${inputSize}`);
    controlClasses.push(`is-${inputSize}`);
  }

  if (iconLeft && !React.isValidElement(iconLeft)) {
    iconLeft = <Icon icon={iconLeft} isLeft size='small'/>
  }
  if (iconRight && !React.isValidElement(iconRight)) {
    iconRight = <Icon icon={iconRight} isRight size='small'/>
  }

  return (
    <div className="field">
      {label && <label className="label">{label}</label>}
      <div className={controlClasses.join(' ')}>
        <input
          type={type}
          className={inputClasses.join(' ')}
          value={inputValue}
          onChange={handleChange}
          {...props}
        />
        {}
        {!!iconLeft && iconLeft}
        {!!iconRight && iconRight}
      </div>
      {helpText && validation === null &&
        <p className="help">{helpText}</p>
      }
      {successText && validation === true &&
        <p className="help is-success">{successText}</p>
      }
      {errorText && validation === null &&
        <p className="help is-danger">{errorText}</p>
      }
    </div>
  )
}

export default Input;