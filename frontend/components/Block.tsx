import React from "react";


/* Description: implementation of Bulma's block component.
 * It simply adds a margin on bottom.
 */
function Block({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const classNames = ['block'];
  if (className) classNames.push(className);

  return <div className={classNames.join(' ')} {...props}>
    {children}
  </div>
}

export default Block;
