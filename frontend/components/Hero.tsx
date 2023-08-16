import React from "react";
import { BulmaColors, BulmaShades, BulmaSizes } from "@/constants/types";


export type Props = React.PropsWithChildren<{
  htmlTag?: keyof JSX.IntrinsicElements
  color?: BulmaColors | BulmaShades
  size?: 'small' | 'medium' | 'large' | 'halfheight' | 'fullheight' |
  'fullheight-with-navbar' // Height a little smaller, so the navbar still appears
}>;


/* Description: implementation of Bulma's Hero component
 * (full-width, fixed-height, no-margin container). "An imposing hero banner
 * to showcase something".
 * 
 * A Hero can have a header, a body and a footer.
 * 
 * Props:
 * - htmlTag?: the HTML tag (default: div);
 * - color?: background color;
 * - size?: changes height and padding;
 */
const Hero: React.FunctionComponent<Props & React.HTMLAttributes<HTMLOrSVGElement>> = ({
  htmlTag: Tag = 'div',
  color,
  size,
  className,
  children,
  ...props
}) => {
  const classNames = ['hero'];
  if (className) classNames.push(className);
  if (color) classNames.push(`is-${color}`);
  if (size) classNames.push(`is-${size}`);

  return <Tag className={classNames.join(' ')} {...props}>
    {children}
  </Tag>;
}

export default Hero;
