import React from "react";
import { BulmaColumnSizes, BulmaBreakpoints } from "@/constants/types";


export interface Props extends React.ComponentPropsWithoutRef<'div'> {
  size?: BulmaColumnSizes | BulmaColumnSizes[]
  narrow?: boolean | BulmaBreakpoints
  offset?: BulmaColumnSizes | BulmaColumnSizes[]
};


/* Description: implementation of Bulma's Column component. It's used for
 * creating responsive grid systems.
 *
 * Props:
 * - size?: column responsive size. Also accepts an array of values;
 * - narrow?: applied to columns where its size is not responsive;
 * - offset?: empty space before column, following the same sizing as 'size'.
 *            Also accepts an array of values;
 */
function Column({
  size,
  narrow,
  offset,
  children,
  className,
  ...props
}: Props) {
  const classNames = ['column'];
  if (className) classNames.push(className);
  if (offset) Array.isArray(offset)
  ? offset.map(o => {classNames.push(`is-offset-${o}`)})
  : classNames.push(`is-offset-${offset}`);

  if (size) Array.isArray(size)
  ? size.map(s => {classNames.push(`is-${s}`)})
  : classNames.push(`is-${size}`);

  else if (narrow === true) classNames.push('is-narrow')
  else if (narrow) classNames.push(`is-narrow-${narrow}`);

  return <div className={classNames.join(' ')} {...props}>
    {children}
  </div>
}

export default Column;
