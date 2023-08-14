import React from "react";

export type Props = React.PropsWithChildren<{
  className?: string
  multiline?: boolean
}>;

/* Description: component used to group several Tags (note the plural), that is,
 *              when you have several Tags with add-ons. Check Bulma's Tag
 *              documentation for a clearer explanation.
 *
 * Props:
 * - size?: tags size;
 * - hasAddons?: tags will be attached to each other;
 */
function TagsGroup({
  multiline=true,
  children,
  className,
  ...props
}: Props) {
  const classNames = ['field is-grouped'];
  if (className) classNames.push(className);
  if (multiline) classNames.push('is-grouped-multiline');

  return <div className={classNames.join(' ')} {...props}>
    {React.Children.map(children, (child) => <div className="control">{child}</div>)}
  </div>
}

export default TagsGroup;
