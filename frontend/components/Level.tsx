import React from "react";


export type Props = React.PropsWithChildren<{
  htmlTag?: keyof JSX.IntrinsicElements
  verticalOnMobile?: boolean
}>;


/* Description: implementation of Bulma's Level component. It is a
 * multi-purpose horizontal level, which can contain almost any other element.
 * 
 * The structure of a level is as follows:
 * <Level>
 *  <LevelLeft>
 *    <LevelItem>...</LevelItem>
 *    <LevelItem>...</LevelItem>
 *  </LevelLeft>
 *  <LevelItem>...</LevelItem> // For centered content
 *  <LevelItem>...</LevelItem>
 *  <LevelRight>
 *    <LevelItem>...</LevelItem>
 *    <LevelItem>...</LevelItem>
 *  </LevelRight>
 * </Level>
 * 
 * Props:
 * - verticalOnMobile?: items will be displayed on vertical;
 * - htmlTag?: the HTML tag (default: div);
 */
const Level: React.FunctionComponent<Props & React.HTMLAttributes<HTMLOrSVGElement>> = ({
  verticalOnMobile,
  htmlTag: Tag = 'div',
  className,
  children,
  ...props
}) => {
  const classNames = ['level'];
  if (className) classNames.push(className);
  if (!verticalOnMobile) classNames.push('is-mobile');

  return <Tag className={classNames.join(' ')} {...props}>
    {children}
  </Tag>;
}

export default Level;
