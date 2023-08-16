import React from "react";


export type Props = React.PropsWithChildren<{
  htmlTag?: keyof JSX.IntrinsicElements
}>;


/* Description: Hero footer section, stick on the bottom.
 * 
 * Props:
 * - htmlTag?: the HTML tag (default: div);
 */
const HeroFoot: React.FunctionComponent<Props & React.HTMLAttributes<HTMLOrSVGElement>> = ({
  htmlTag: Tag = 'div',
  className,
  children,
  ...props
}) => {
  const classNames = ['hero-foot'];
  if (className) classNames.push(className);

  return <Tag className={classNames.join(' ')} {...props}>
    {children}
  </Tag>;
}

export default HeroFoot;
