"use client";

// TODO: implement other types of input, including select, radio, checkbox

import React, { useState } from "react";
import Icon from "./Icon";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Input from "./Input";
import {
  BulmaColors,
  BulmaSizes,
  BulmaStates,
  InputTypes
} from "@/constants/types";


// export interface Props extends React.ComponentPropsWithoutRef<'select'> {
export interface Props {
  multiple?: boolean
  color?: BulmaColors
  inputSize?: BulmaSizes
  state?: BulmaStates
  label?: string
  validate?: (data: any) => boolean
  helpText?: string
  successText?: string
  errorText?: string
  iconLeft?: React.ReactNode | IconDefinition
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
// function Select({
//   value,
//   setValue,
//   multiple,
//   inputSize,
//   onChange,
//   label,
//   validate,
//   helpText,
//   successText,
//   errorText,
//   iconLeft,
//   state,
//   color,
//   ...props
// }: Props) {
//   const [inputValue, setInputValue] = useState<any>(value || '');
//   const [validation, setValidation] = useState<boolean | null>(null);

//   const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     if (onChange)
//       onChange(event);
//     if (validate)
//       setValidation(validate(event.target.value));
//     if (setValue)
//       setValue(event.target.value);
//     setInputValue(event.target.value);
//   }

//   let inputClasses = [];
//   if (state) inputClasses.push(`is-${state}`);

//   let wrapperClasses = ['select'];
//   if (validation === true) wrapperClasses.push('is-success');
//   if (validation === false) wrapperClasses.push('is-danger');
//   if (color && typeof validation !== 'boolean') wrapperClasses.push(`is-${color}`);
//   if (inputSize) wrapperClasses.push(`is-${inputSize}`);
//   if (multiple) wrapperClasses.push('is-multiple');
  
//   let controlClasses = ['control'];
//   if (iconLeft) controlClasses.push('has-icons-left');

//   if (iconLeft && !React.isValidElement(iconLeft)) {
//     iconLeft = <Icon icon={iconLeft} isLeft size={inputSize}/>
//   }

//   return (
//     <div className="field">
//       {label && <label className="label">{label}</label>}
//       <div className={controlClasses.join(' ')}>
//         <div className={wrapperClasses.join(' ')}>
//           <select
//             multiple={multiple}
//             className={inputClasses.join(' ')}
//             value={inputValue}
//             onChange={handleChange}
//             {...props}
//           >
//             <option>World</option>
//           </select>
//         </div>
//         {iconLeft}
//       </div>
//       {helpText && validation === null &&
//         <p className="help">{helpText}</p>
//       }
//       {successText && validation === true &&
//         <p className="help is-success">{successText}</p>
//       }
//       {errorText && validation === null &&
//         <p className="help is-danger">{errorText}</p>
//       }
//     </div>
//   )
// }

function Select({
  multiple,
  color,
  inputSize,
  state,
  label,
  validate,
  helpText,
  successText,
  errorText,
  iconLeft,
  // onChange,
  ...props
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [values, setValues] = useState<any>(multiple ? Array() : '');
  const [inputText, setInputText] = useState<string>('');

  const handleChange = (value: any) => {
    // Toggles 'value' inside 'values'
    // if (onChange)
    //   onChange(values)
    if (!multiple) {
      setValues(value);
      return
    }

    let newValues = Array();
    let shouldInclude = true;
    for (let val of values) {
      if (val === value) shouldInclude = false
      else newValues.push(val);
    }

    if (shouldInclude) newValues.push(value);
    setValues(newValues);
  }

  return (
    <div className='block'>
      <Input type='text' iconRight={isOpen ? faChevronUp : faChevronDown}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        controlClassNames="mb-0"
        fieldClassNames="mb-0"
        onChange={(e) => setInputText(e.target.value)}
        value={inputText}
      />
      <div className={isOpen ? "dropdown is-active" : "dropdown"}>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            <a href="#" className="dropdown-item">
              Dropdown item
            </a>
            <a className="dropdown-item">
              Other dropdown item
            </a>
            <a href="#" className="dropdown-item is-active">
              Active dropdown item
            </a>
            <a href="#" className="dropdown-item">
              Other dropdown item
            </a>
            <hr className="dropdown-divider" />
            <a href="#" className="dropdown-item">
              With a divider
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Select;
