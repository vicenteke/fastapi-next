import React from "react";


export type Props = React.PropsWithChildren<{
  htmlTag?: keyof JSX.IntrinsicElements
}>;


/* Description: used for the right-aligned content of a Level.
 * 
 * Props:
 * - htmlTag?: the HTML tag (default: div);
 */
const LevelRight: React.FunctionComponent<Props & React.HTMLAttributes<HTMLOrSVGElement>> = ({
  htmlTag: Tag = 'div',
  className,
  children,
  ...props
}) => {
  const classNames = ['level-right'];
  if (className) classNames.push(className);

  return <Tag className={classNames.join(' ')} {...props}>
    {children}
  </Tag>;
}

export default LevelRight;
