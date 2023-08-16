import React from "react";


export type Props = React.PropsWithChildren<{
  htmlTag?: keyof JSX.IntrinsicElements
}>;


/* Description: Hero header section, stick on the top.
 * 
 * Props:
 * - htmlTag?: the HTML tag (default: div);
 */
const HeroHead: React.FunctionComponent<Props & React.HTMLAttributes<HTMLOrSVGElement>> = ({
  htmlTag: Tag = 'div',
  className,
  children,
  ...props
}) => {
  const classNames = ['hero-head'];
  if (className) classNames.push(className);

  return <Tag className={classNames.join(' ')} {...props}>
    {children}
  </Tag>;
}

export default HeroHead;
