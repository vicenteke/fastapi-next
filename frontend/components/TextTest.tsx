import React from "react";
import { BulmaTextSize, WrapperProps } from "@/constants/types";
import Wrapper from "./Wrapper";


export type Props = WrapperProps & {
  title?: boolean
  subtitle?: boolean
  size?: BulmaTextSize | BulmaTextSize[]
  isSpaced?: boolean
};

/* Description: basic typography component.
 *
 * Props (also includes NextImage props):
 * - title?: if it's a title;
 * - subtitle?: if it's a subtitle;
 * - size?: text size (from 1 to 6);
 * - isSpaced?: whether to include some spacing after the text or not;
 */
function TextTest({
  title,
  children,
  subtitle,
  size,
  isSpaced,
  className,
  ...props
}: Props) {
  const classNames = [];
  if (className) classNames.push(className);
  if (title) classNames.push('title');
  if (subtitle) classNames.push('subtitle');
  if (isSpaced) classNames.push('is-spaced');
  if (size) Array.isArray(size)
  ? size.map(s => {classNames.push(`is-size-${s}`)})
  : classNames.push(`is-${size}`);

  return <Wrapper className={classNames.join(' ')} {...props}>{children}</Wrapper>
}

export default TextTest;
