import React from "react";


export type Props = React.PropsWithChildren<{
  htmlTag?: keyof JSX.IntrinsicElements
}>;


/* Description: left side of a Media Object, usually an image.
 * 
 * Props:
 * - htmlTag?: the HTML tag (default: figure);
 */
const MediaObjectLeft: React.FunctionComponent<Props & React.HTMLAttributes<HTMLOrSVGElement>> = ({
  htmlTag: Tag = 'figure',
  className,
  children,
  ...props
}) => {
  const classNames = ['media-left'];
  if (className) classNames.push(className);

  return <Tag className={classNames.join(' ')} {...props}>
    {children}
  </Tag>;
}

export default MediaObjectLeft;
