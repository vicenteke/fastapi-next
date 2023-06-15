import React from "react";
import { BulmaColors, BulmaSizes, ButtonProps } from '@/constants/types'
import { deleteToken } from "@/lib/token";
import Button from "./Button";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IconProps extends React.ComponentPropsWithoutRef<'span'> {
  icon: IconDefinition;
  size?: BulmaSizes;
  color?: BulmaColors;
  animation?: 'spin' | 'pulse';
  bordered?: boolean;
  fixedWidth?: boolean;
  className?: string;
}


/* Description: just a logout button. It implements the same Button interface.
 */
function Icon({
  icon,
  size,
  color,
  animation,
  bordered,
  fixedWidth,
  className,
  style,
  ...props
}: IconProps) {

  let classNames = [className, 'icon'];
  let iconClassNames = ['fas'];
  if (typeof color === 'string') classNames.push("has-text-" + color);
  if (typeof size === 'string') {
    classNames.push("is-" + size);
    // TODO: create specific component for Alert Icons
    iconClassNames.push(size === 'large' ? 'fa-6x' : size !== 'small' ? 'fa-lg' : '');
  }
  if (typeof animation === 'string') iconClassNames.push("fa-" + animation);
  if (bordered) iconClassNames.push("fa-border");
  if (fixedWidth) iconClassNames.push("fa-fw");

  return (
    <span
      className={classNames.join(" ")}
      style={{width: '100% !important',
      height: 'auto', ...style}}
      {...props}
      >
      <FontAwesomeIcon icon={icon} className={iconClassNames.join(' ')} width="100%" />
    </span>
  )
}

export default Icon;
