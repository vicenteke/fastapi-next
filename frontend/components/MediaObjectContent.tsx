import React from "react";


export type Props = React.PropsWithChildren<{
  htmlTag?: keyof JSX.IntrinsicElements
}>;


/* Description: right side of a Media Object, usually a text block.
 * 
 * Props:
 * - htmlTag?: the HTML tag (default: div);
 */
const MediaObjectContent: React.FunctionComponent<Props & React.HTMLAttributes<HTMLOrSVGElement>> = ({
  htmlTag: Tag = 'div',
  className,
  children,
  ...props
}) => {
  const classNames = ['media-content'];
  if (className) classNames.push(className);

  return <Tag className={classNames.join(' ')} {...props}>
    {children}
  </Tag>;
}

export default MediaObjectContent;
