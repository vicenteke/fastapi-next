import React from "react";
import { BulmaSizes } from "@/constants/types";

export interface Props {
  className?: string
  size?: BulmaSizes
};

/* Description: implementation of Bulma's Delete component
 *
 * Props (also includes NextImage props):
 * - size?: tags size;
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
