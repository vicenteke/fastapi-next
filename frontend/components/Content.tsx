import React from "react";
import { BulmaSizes } from "@/constants/types";


export interface Props extends React.ComponentPropsWithoutRef<'div'> {
  size?: BulmaSizes
};


/* Description: implementation of Bulma's content component.
 * It's "a single class to handle WYSIWYG generated content, where only HTML
 * tags are available".
 *
 * Props:
 * - size?: content size;
 */
function Content({
  size,
  children,
  className,
  ...props
}: Props) {
  const classNames = ['content'];
  if (className) classNames.push(className);
  if (size) classNames.push(`is-${size}`);

  return <div className={classNames.join(' ')} {...props}>
    {children}
  </div>
}

export default Content;
