import React from "react";
import { BulmaColors, BulmaSizes, BulmaShades } from "@/constants/types";


export interface Props extends React.ComponentPropsWithoutRef<'progress'> {
  color?: BulmaColors | BulmaShades
  size?: BulmaSizes
};
/* Description: implementation of Bulma's progress bar component.
 *
 * Props:
 * - size?: bar height;
 * - color?: bar color;
 */
function ProgressBar({
  color,
  size,
  children,
  className,
  ...props
}: Props) {
  const classNames = ['progress'];
  if (className) classNames.push(className);
  if (size) classNames.push(`is-${size}`);
  if (color) classNames.push(`is-${color}`);

  return <progress className={classNames.join(' ')} {...props}>{children}</progress>;
}

export default ProgressBar;
