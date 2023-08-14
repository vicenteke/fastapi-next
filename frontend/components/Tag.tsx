import React from "react";
import { BulmaColors, BulmaSizes, BulmaShades } from "@/constants/types";

export type Props = React.PropsWithChildren<{
  className?: string
  light?: boolean
  color?: BulmaColors | BulmaShades
  size?: BulmaSizes
  isRounded?: boolean
  isDelete?: boolean
  htmlTag?: 'span' | 'a' | 'button' | 'div'
}>;

/* Description: implementation of Bulma's Tag component.
 *
 * Props:
 * - light?: if the color should be a lighter shade;
 * - color?: tag color;
 * - size?: tag size;
 * - isRounded?: if the corners should be rounded;
 * - isDelete?: if it should be a delete tag ('X' tag);
 * - htmlTag?: which HTML tag to use (defaults to span);
 */
function Tag({
  isRounded,
  isDelete,
  htmlTag,
  light,
  color,
  size,
  children,
  className,
  ...props
}: Props) {
  const classNames = ['tag'];
  if (className) classNames.push(className);
  if (light && color !== 'light') classNames.push('is-light');
  if (isRounded) classNames.push('is-rounded');
  if (isDelete) classNames.push('is-delete');
  if (size) classNames.push(`is-${size}`);
  if (color) classNames.push(`is-${color}`);

  switch (htmlTag) {
    case 'a':  return <a className={classNames.join(' ')} {...props}>{children}</a>;
    case 'button':  return <button className={classNames.join(' ')} {...props}>{children}</button>;
    case 'div':  return <div className={classNames.join(' ')} {...props}>{children}</div>;
    default: return <span className={classNames.join(' ')} {...props}>{children}</span>;
  }
}

export default Tag;
