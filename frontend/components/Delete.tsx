import React from "react";
import { BulmaSizes } from "@/constants/types";

export interface Props extends React.ComponentPropsWithoutRef<'button'> {
  size?: BulmaSizes
};

/* Description: implementation of Bulma's Delete component
 *
 * Props:
 * - size?: button size;
 */
function Delete({
  size,
  className,
  ...props
}: Props) {
  const classNames = ['delete'];
  if (className) classNames.push(className);
  if (size) classNames.push(`are-${size}`);

  return <button className={classNames.join(' ')} {...props}></button>
}

export default Delete;
