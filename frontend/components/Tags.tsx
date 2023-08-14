import React from "react";
import { BulmaSizes } from "@/constants/types";

export type Props = React.PropsWithChildren<{
  className?: string
  size?: BulmaSizes
  hasAddons?: boolean
}>;

/* Description: implementation of Bulma's Tags component (i.e. for tag groups).
 *              NOTE that childrens should be tag components ore compatible
 *              (e.g. buttons and anchors). Also, if you want to group multiple
 *              tag groups (with add-ons), you should use the TagsGroup component.
 *
 * Props:
 * - size?: tags size;
 * - hasAddons?: tags will be attached to each other;
 * 
 * Example:
 * <TagsGroup multiline>
 *   <Tags hasAddons size='large'>
 *    <Tag color='warning' isRounded>Hey</Tag>
 *    <Tag isDelete isRounded color='warning'></Tag>
 *   </Tags>
 *   <Tags hasAddons size='large'>
 *    <Tag color='info' isRounded>Nice<Delete></Delete></Tag>
 *    <Tag isRounded color='info'>Some text</Tag>
 *   </Tags>
 * </TagsGroup>
 */
function Tags({
  size,
  hasAddons,
  children,
  className,
  ...props
}: Props) {
  const classNames = ['tags'];
  if (className) classNames.push(className);
  if (size) classNames.push(`are-${size}`);
  if (hasAddons) classNames.push('has-addons');

  return <div className={classNames.join(' ')} {...props}>{children}</div>
}

export default Tags;
