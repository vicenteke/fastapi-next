import React from "react";
import { BulmaBreakpoints, BulmaColumnGaps } from "@/constants/types";


export interface Props extends React.ComponentPropsWithoutRef<'div'> {
  multiline?: boolean
  gapless?: boolean
  gap?: BulmaColumnGaps | BulmaColumnGaps[]
  vCenter?: boolean
  center?: boolean
  responsiveFrom?: BulmaBreakpoints
};


/* Description: implementation of Bulma's Columns component.
 * It's a wrapper for columns.
 *
 * Props:
 * - multiline?: if columns should be wrapped;
 * - gapless?: if there should not be any gap between columns;
 * - gap?: the gap size (overriden by 'gapless'). Also accepts an array of values;
 * - vCenter?: vertically center columns;
 * - center?: horizontally center columns;
 * - responsiveFrom?: breakpoint where it starts behaving responsively.
 *                    Before that, the content will be stacked;
 */
function Columns({
  multiline,
  gapless,
  gap,
  vCenter,
  center,
  responsiveFrom,
  children,
  className,
  ...props
}: Props) {
  const classNames = ['columns'];
  if (className) classNames.push(className);
  if (multiline) classNames.push('is-multiline');
  if (vCenter) classNames.push('is-vcentered');
  if (center) classNames.push('is-centered');
  if (gapless) classNames.push('is-gapless')
  else if (gap) {
    Array.isArray(gap)
    ? gap.map(g => {classNames.push(`is-${g}`)})
    : classNames.push(`is-${gap}`);
    classNames.push('is-variable');
  }

  if (responsiveFrom) classNames.push(`is-${responsiveFrom}`);

  return <div className={classNames.join(' ')} {...props}>
    {children}
  </div>
}

export default Columns;
