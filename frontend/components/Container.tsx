import React from "react";


export interface Props extends React.ComponentPropsWithoutRef<'div'> {
  fluid?: boolean
  breakpoint?: 'widescreen' | 'fullhd'
  max?: 'desktop' | 'widescreen'
};

/* Description: implementation of Bulma's Container component.
 *
 * Props:
 * - fluid?: it will have a 32px gap on either side, on any viewport size;
 * - breakpoint?: it is full-width until this breakpoint (default: 'desktop');
 * - max?: it will stop growing after this breakpoint;
 */
function Container({
  breakpoint,
  max,
  fluid,
  className,
  children,
  ...props
}: Props) {
  const classNames = ['container'];
  if (className) classNames.push(className);
  if (breakpoint) classNames.push(`is-${breakpoint}`);
  if (max) classNames.push(`is-${max}`);
  if (fluid) classNames.push('is-fluid');

  return <div className={classNames.join(' ')} {...props}>
    {children}
  </div>
}

export default Container;
