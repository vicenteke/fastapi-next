"use client";

// TODO: implement other types of input, including select, radio, checkbox

import React, { useEffect, useState } from "react";
import Icon from "./Icon";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import useSelect, { optionItem } from "@/hooks/select";
import Input from "./Input";
import SelectItem from "./SelectItem";
import Block from "./Block";
import {
  BulmaColors,
  BulmaSizes,
  BulmaStates,
  InputTypes
} from "@/constants/types";


// export interface Props extends React.ComponentPropsWithoutRef<'select'> {
export interface Props {
  options: Array<optionItem>
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
  enableNewValues?: boolean
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
  options,
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
  enableNewValues,
  // onChange,
  ...props
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const {
    value,
    setValue,
    filteredOptions,
    setFilteredOptions,
    onSelect,
    onFilterLabel,
    onFilterValue,
    onFilterAll,
  } = useSelect({options, isMulti: multiple, enableNewValues});

  useEffect(() => {
    onFilterLabel(inputText);
  }, [inputText])

  return (
    <Block>
      <div>
        Value(s): {value && Array.isArray(value) ? value.map((item) => item.value).join(', ') : value!.value}
      </div>
      <Input type='text' iconRight={isOpen ? faChevronUp : faChevronDown}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        controlClassNames="mb-0"
        fieldClassNames="mb-0"
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => {
          if (enableNewValues && e.key === 'Enter')
            onSelect({label: inputText, value: inputText})
        }}
        value={inputText}
      />
      <div className={isOpen ? "dropdown is-active is-hoverable" : "dropdown is-hoverable"}>
        <div className="dropdown-menu" role="select">
          <div className="dropdown-content">
            {filteredOptions.map((option, index) => (
              <SelectItem
                option={option}
                key={index}
                onSelect={onSelect}
                color={color}
                isActive={
                  Array.isArray(value) ?
                  value.some((val) => JSON.stringify(val) === JSON.stringify(option))
                  : JSON.stringify(value) === JSON.stringify(option)
                }
              />
              ))}
          </div>
        </div>
      </div>
    </Block>
  )
}

export default Select;
