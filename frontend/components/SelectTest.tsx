"use client";

// TODO: implement other types of input, including select, radio, checkbox

import React, { useEffect, useState } from "react";
import useSelect, { Props as SelectProps } from "@/hooks/select";
import Input from "./Input";


function SelectTest({options, isMulti, enableNewValues}: SelectProps) {
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
  } = useSelect({options, isMulti, enableNewValues});

  useEffect(() => {
    onFilterLabel(inputText);
  }, [inputText])

  return (
    <div className='block'>
      <span style={{ fontWeight: 'bold' }}>Options</span><br />
      <span>{
        filteredOptions.map((item, i) => (<div key={i + 600} onClick={() => onSelect(item)}>{item.label}: {item.value}<br /></div>))
      }</span><br />
      <Input type='text'
        controlClassNames="mb-0"
        fieldClassNames="mb-0"
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => {if (e.key === 'Enter') onSelect({label: inputText, value: inputText})}}
        value={inputText}
      />
      <span style={{ fontWeight: 'bold' }}>Value(s)</span><br />
      <span>
        {Array.isArray(value) ?
        value.map((item, i) => (<div key={i}>{item.label}: {item.value}<br /></div>))
        : value ? <div>{value.label}: {value.value}<br /></div> : 'Nothing selected'
        }
      </span>
    </div>
  )
}

export default SelectTest;
