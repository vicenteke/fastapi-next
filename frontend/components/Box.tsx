import React from "react";


/* Description: implementation of Bulma's box component.
 * The box element is a simple container with a white background,
 * some padding, and a box shadow.
 */
function Box({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const classNames = ['box'];
  if (className) classNames.push(className);

  return <div className={classNames.join(' ')} {...props}>
    {children}
  </div>
}

export default Box;
