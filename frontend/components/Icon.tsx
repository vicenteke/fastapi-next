import React from "react";
import { BulmaColors, BulmaSizes, ButtonProps } from '@/constants/types'
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface IconProps extends React.ComponentPropsWithoutRef<'span'> {
  icon: IconDefinition;
  size?: BulmaSizes;
  color?: BulmaColors;
  animation?: 'spin' | 'pulse';
  bordered?: boolean;
  fixedWidth?: boolean;
  className?: string;
  iconSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  isLeft?: boolean
  isRight?: boolean

}


/* Description: icon abstraction, intended for FontAwesome icons.
 * Props:
 * - icon: the react-fontawesome icon;
 * - size: Bulma size;
 * - color: Bulma color;
 * - animation: adds movement to the icon;
 * - bordered: adds bordered style to the component;
 * - fixedWidth: ;
 * - iconSize: scale up the icon as desired;
 * - isLeft | isRight: icons inside inputs have to be either left or right
 * aligned;
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
  iconSize,
  isLeft,
  isRight,
  ...props
}: IconProps) {

  let classNames = [className, 'icon'];
  if (typeof color === 'string') classNames.push("has-text-" + color);
  if (typeof size === 'string') {
    classNames.push("is-" + size);
  }
  if (isLeft) classNames.push('is-left');
  if (isRight) classNames.push('is-right');

  let iconClassNames = ['fas'];
  if (iconSize) {
    iconClassNames.push(`fa-${iconSize}x`);
  } else if (size === 'large') {
    iconClassNames.push('fa-lg');
  }
  if (typeof animation === 'string') iconClassNames.push("fa-" + animation);
  if (bordered) iconClassNames.push("fa-border");
  if (fixedWidth) iconClassNames.push("fa-fw");

  return (
    <span
      className={classNames.join(" ")}
      style={{width: '100% !important', ...style}}
      {...props}
      >
      <FontAwesomeIcon icon={icon} className={iconClassNames.join(' ')} width="100%" />
    </span>
  )
}

export default Icon;
