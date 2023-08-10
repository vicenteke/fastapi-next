import React from "react";
import styles from "@/styles/SelectItem.module.scss";
import { optionItem } from "@/hooks/select";
import { BulmaColors } from "@/constants/types";


interface Props {
  option: optionItem
  onSelect?: (option: optionItem) => void
  color?: BulmaColors
  isActive?: boolean
}


function SelectItem({
  option,
  onSelect,
  color,
  isActive,
}: Props) {
  const classNames = ['dropdown-item', styles.selectItem];
  if (color) classNames.push(styles[color]);
  if (isActive) classNames.push(styles[`${color}Active`]);

  return (
    <div className={classNames.join(' ')}
      onClick={() => {if (onSelect) onSelect(option)}}
    >
      {option.label}
    </div>
  )
}

export default SelectItem;
