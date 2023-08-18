import React from "react";
import { BulmaTextSize, WrapperProps } from "@/constants/types";

export type Props = WrapperProps & {
  title?: boolean
  subtitle?: boolean
  size?: BulmaTextSize | BulmaTextSize[]
  isSpaced?: boolean
  useHeadingTags?: boolean
};

/* Description: basic typography component.
 *
 * Props (also includes NextImage props):
 * - title?: if it's a title;
 * - subtitle?: if it's a subtitle;
 * - size?: text size (from 1 to 6);
 * - isSpaced?: whether to include some spacing after the text or not;
 * - useHeadingTags?: whether to use h1, h2, h3... tags or the p tag;
 */
function Text({
  children,
  title,
  subtitle,
  size,
  isSpaced,
  useHeadingTags,
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

  if (!useHeadingTags || !size)
    return <p className={classNames.join(' ')} {...props}>{children}</p>

  switch (size) {
    case 1: return <h1 className={classNames.join(' ')} {...props}>{children}</h1>;
    case 2: return <h2 className={classNames.join(' ')} {...props}>{children}</h2>;
    case 3: return <h3 className={classNames.join(' ')} {...props}>{children}</h3>;
    case 4: return <h4 className={classNames.join(' ')} {...props}>{children}</h4>;
    case 5: return <h5 className={classNames.join(' ')} {...props}>{children}</h5>;
    case 6: return <h6 className={classNames.join(' ')} {...props}>{children}</h6>;
    default: return <p className={classNames.join(' ')} {...props}>{children}</p>;
  }
}

export default Text;
