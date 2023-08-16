import React from "react";


export type Props = React.PropsWithChildren<{
  htmlTag?: keyof JSX.IntrinsicElements
}>;


/* Description: implementation of Bulma's Media Object.
 * 
 * Props:
 * - htmlTag?: the HTML tag (default: article);
 */
const MediaObject: React.FunctionComponent<Props & React.HTMLAttributes<HTMLOrSVGElement>> = ({
  htmlTag: Tag = 'article',
  className,
  children,
  ...props
}) => {
  const classNames = ['media'];
  if (className) classNames.push(className);

  return <Tag className={classNames.join(' ')} {...props}>
    {children}
  </Tag>;
}

export default MediaObject;
