"use client";

// TODO: likely unnecessary

import { useState } from "react";
import useDebounce from "./debounce";

export interface optionItem {
  label: string
  value: any
}

export const checkIfIsOption = (entry: any) =>
  (typeof entry.label === 'string' && typeof entry.value !== 'undefined')

export interface Props {
  options: Array<optionItem>
  isMulti?: boolean
  enableNewValues?: boolean
}

/* Description: hook that abstracts a select/multiselect behaviour.
 * Props:
 * - options: array of options;
 * - isMulti?: whether it's a multiselect or not;
 * - enableNewValues?: whether it accepts new entries from the user or not;
 */
const useSelect = ({
  options,
  isMulti,
  enableNewValues,
}: Props) => {
  const [value, setValue] = isMulti ? useState<Array<optionItem>>([]) : useState<optionItem | null>(null);
  const [filteredOptions, setFilteredOptions] = useState<Array<optionItem>>(options);
  const debounce = useDebounce();

  function _calculateFilteredByLabel(filter: string) {
    if (!filter) return options;
    const filterWords = filter.toLowerCase().replace(',', ' ').split(' ').filter((item) => item !== '');
    const newFilteredOptions = options.filter((opt) => {
      const label = opt.label.toLowerCase();
      return filterWords.some((word) => label.includes(word));
    });
    return newFilteredOptions;
  }

  function _calculateFilteredByValue(filter: string) {
    if (!filter) return options;
    const filterWords = filter.toLowerCase().replace(',', ' ').split(' ').filter((item) => item !== '');
    const newFilteredOptions = options.filter((opt) => {
      const value = opt.value.toString().toLowerCase();
      return filterWords.some((word) => value.includes(word));
    });
    return newFilteredOptions;
  }

  function _calculateFilteredByAll(filter: string) {
    if (!filter) return options;
    const filteredByLabel = _calculateFilteredByLabel(filter);
    const filteredByValue = _calculateFilteredByValue(filter);
    const newFilteredOptions = [...filteredByLabel, ...filteredByValue].reduce(
      (res, value) => {
        if (!res.some((item) => JSON.stringify(item) === JSON.stringify(value)))
          res.push(value);
        return res;
      }, Array<optionItem>());
    return newFilteredOptions;
  }

  const onSelect = (item: optionItem) => {
    if (!options.some((opt) => JSON.stringify(opt) === JSON.stringify(item)) &&
        (!enableNewValues || !checkIfIsOption(item)))
      return false

    if (isMulti) {
      let newValue = [...value as optionItem[]];
      if ((value as optionItem[]).some((opt) => JSON.stringify(opt) === JSON.stringify(item)))
        newValue = newValue.filter((val) => JSON.stringify(val) !== JSON.stringify(item))
      else newValue.push(item);
      setValue(newValue);
    } else setValue(item);
    return true
  }

  const onFilterLabel = (filter: string) => {
    debounce(() => setFilteredOptions(_calculateFilteredByLabel(filter)));
  }

  const onFilterValue = (filter: string) => {
    debounce(() => setFilteredOptions(_calculateFilteredByValue(filter)));
  }

  const onFilterAll = (filter: string) => {
    debounce(() => setFilteredOptions(_calculateFilteredByAll(filter)));
  }

  return {
    value,
    setValue,
    filteredOptions,
    setFilteredOptions,
    onSelect,
    onFilterLabel,
    onFilterValue,
    onFilterAll,
  }
}

export default useSelect
