import React from "react";


export type Props = React.PropsWithChildren<{
  htmlTag?: keyof JSX.IntrinsicElements
}>;


/* Description: Hero body section, vertically centralized.
 * 
 * Props:
 * - htmlTag?: the HTML tag (default: div);
 */
const HeroBody: React.FunctionComponent<Props & React.HTMLAttributes<HTMLOrSVGElement>> = ({
  htmlTag: Tag = 'div',
  className,
  children,
  ...props
}) => {
  const classNames = ['hero-body'];
  if (className) classNames.push(className);

  return <Tag className={classNames.join(' ')} {...props}>
    {children}
  </Tag>;
}

export default HeroBody;
