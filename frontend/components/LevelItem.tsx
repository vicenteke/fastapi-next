import React from "react";


export type Props = React.PropsWithChildren<{
  htmlTag?: keyof JSX.IntrinsicElements
  center?: boolean
}>;


/* Description: used for the items of a Level.
 * 
 * Props:
 * - htmlTag?: the HTML tag (default: div);
 * - center?: centralize content;
 */
const LevelItem: React.FunctionComponent<Props & React.HTMLAttributes<HTMLOrSVGElement>> = ({
  htmlTag: Tag = 'div',
  center,
  className,
  children,
  ...props
}) => {
  const classNames = ['level-item'];
  if (className) classNames.push(className);
  if (center) classNames.push('has-text-centered');

  return <Tag className={classNames.join(' ')} {...props}>
    {children}
  </Tag>;
}

export default LevelItem;
