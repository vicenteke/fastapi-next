import React from "react";


export type Props = React.PropsWithChildren<{
  htmlTag?: keyof JSX.IntrinsicElements
}>;


/* Description: implementation of Bulma's footer component, a simple container
 * with lots of bottom padding, making it great as the last element of any
 * webpage.
 * 
 * Props:
 * - htmlTag?: the HTML tag (default: footer);
 */
const Footer: React.FunctionComponent<Props & React.HTMLAttributes<HTMLOrSVGElement>> = ({
  htmlTag: Tag = 'footer',
  className,
  children,
  ...props
}) => {
  const classNames = ['footer'];
  if (className) classNames.push(className);

  return <Tag className={classNames.join(' ')} {...props}>
    {children}
  </Tag>;
}

export default Footer;
