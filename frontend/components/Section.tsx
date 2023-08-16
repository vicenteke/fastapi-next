import React from "react";


export type Props = React.PropsWithChildren<{
  htmlTag?: keyof JSX.IntrinsicElements
  size?: 'medium' | 'large'
}>;


/* Description: implementation of Bulma's section component.
 * "A simple container to divide your page into sections".
 * 
 * Props:
 * - htmlTag?: the HTML tag (default: section);
 * - size?: changes spaing;
 */
const Hero: React.FunctionComponent<Props & React.HTMLAttributes<HTMLOrSVGElement>> = ({
  htmlTag: Tag = 'section',
  size,
  className,
  children,
  ...props
}) => {
  const classNames = ['section'];
  if (className) classNames.push(className);
  if (size) classNames.push(`is-${size}`);

  return <Tag className={classNames.join(' ')} {...props}>
    {children}
  </Tag>;
}

export default Hero;
