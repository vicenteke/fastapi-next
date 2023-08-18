import React from "react";
import { WrapperProps } from "@/constants/types";


/* Description: a wrapper for basic styling which should be used as base
 * for many other components. Basically, it implements Bulma's helpers.
 * 
 * Props:
 * - htmlTag?: the HTML tag (default: div);
 * - textColor?: text color;
 * - backgroundColor?: background color;
 * - margin?: CSS 'margin';
 * - marginTop?: CSS 'margin-top';
 * - marginBottom?: CSS 'margin-bottom';
 * - marginLeft?: CSS 'margin-left';
 * - marginRight?: CSS 'margin-right';
 * - marginX?: CSS 'margin-left and margin-right';
 * - marginY?: CSS 'margin-top and margin-bottom';
 * - padding?: CSS 'padding';
 * - paddingTop?: CSS 'padding-top';
 * - paddingBottom?: CSS 'padding-bottom';
 * - paddingLeft?: CSS 'padding-left';
 * - paddingRight?: CSS 'padding-right';
 * - paddingX?: CSS 'padding-left and padding-right';
 * - paddingY?: CSS 'padding-top and padding-bottom';
 * - textAlign?: CSS 'text-align';
 * - capitalized?: capitalize text;
 * - lowercase?: make text lowercase;
 * - uppercase?: make text lowercase;
 * - italic?: make text italic;
 * - underlined?: underline text;
 * - textWeight?: CSS 'font-weight';
 * - fontFamily?: CSS 'font-family';
 * - show?: visibility;
 * - hide?: opposite visibility;
 * - invisible?: make CSS 'visibility: hidden';
 * - hidden?: hides element;
 * - srOnly?: display only on screen-readers;
 * - clearfix?:	fixes an element's floating children;
 * - pulledLeft?:	moves an element to the left;
 * - pulledRight?:	moves an element to the right;
 * - overlay?:	completely covers the first positioned parent;
 * - clipped?:	adds overflow hidden;
 * - radiusless?:	removes any radius;
 * - shadowless?:	removes any shadow;
 * - unselectable?:	prevents the text from being selectable;
 * - clickable?:	applies cursor: pointer !important to the element.;
 * - relative?:	applies position: relative to the element.;
 */
const Wrapper: React.FunctionComponent<WrapperProps> = ({
  htmlTag: Tag = 'div',
  textColor,
  backgroundColor,
  margin,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  marginX,
  marginY,
  padding,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingX,
  paddingY,
  textAlign,
  capitalized,
  lowercase,
  uppercase,
  italic,
  underlined,
  textWeight,
  fontFamily,
  show,
  hide,
  invisible,
  hidden,
  srOnly,
  clearfix,
  pulledLeft,
  pulledRight,
  overlay,
  clipped,
  radiusless,
  shadowless,
  unselectable,
  clickable,
  relative,
  className,
  children,
  ...props
}) => {
  const classNames = [];
  if (className) classNames.push(className);
  if (textColor) classNames.push(`has-text-${textColor}`);
  if (backgroundColor) classNames.push(`has-text-${backgroundColor}`);
  if (margin) classNames.push(`m-${margin}`);
  if (marginTop) classNames.push(`mt-${marginTop}`);
  if (marginBottom) classNames.push(`mb-${marginBottom}`);
  if (marginLeft) classNames.push(`ml-${marginLeft}`);
  if (marginRight) classNames.push(`mr-${marginRight}`);
  if (marginX) classNames.push(`mx-${marginX}`);
  if (marginY) classNames.push(`my-${marginY}`);
  if (padding) classNames.push(`p-${padding}`);
  if (paddingTop) classNames.push(`pt-${paddingTop}`);
  if (paddingBottom) classNames.push(`pb-${paddingBottom}`);
  if (paddingLeft) classNames.push(`pl-${paddingLeft}`);
  if (paddingRight) classNames.push(`pr-${paddingRight}`);
  if (paddingX) classNames.push(`px-${paddingX}`);
  if (paddingY) classNames.push(`py-${paddingY}`);
  if (capitalized) classNames.push('is-capitalized');
  if (lowercase) classNames.push('is-lowercase');
  if (uppercase) classNames.push('is-uppercase');
  if (italic) classNames.push('is-italic');
  if (underlined) classNames.push('is-underlined');
  if (textWeight) classNames.push(`has-text-weight-${textWeight}`);
  if (fontFamily) classNames.push(`is-family-${fontFamily}`);
  if (invisible) classNames.push('is-invisible');
  if (hidden) classNames.push('is-hidden');
  if (srOnly) classNames.push('is-sr-only');
  if (clearfix) classNames.push('is-clearfix');
  if (pulledLeft) classNames.push('is-pulled-left');
  if (pulledRight) classNames.push('is-pulled-right');
  if (overlay) classNames.push('is-overlay');
  if (clipped) classNames.push('is-clipped');
  if (radiusless) classNames.push('is-radiusless');
  if (shadowless) classNames.push('is-shadowless');
  if (unselectable) classNames.push('is-unselectable');
  if (clickable) classNames.push('is-clickable');
  if (relative) classNames.push('is-relative');

  if (textAlign) Array.isArray(textAlign)
  ? textAlign.map(s => {classNames.push(`has-text-${s}`)})
  : classNames.push(`has-text-${textAlign}`);

  if (show) Array.isArray(show)
  ? show.map(s => {classNames.push(`is-${s}`)})
  : classNames.push(`is-${show}`);

  if (hide) Array.isArray(hide)
  ? hide.map(s => {classNames.push(`is-hidden-${s}`)})
  : classNames.push(`is-hidden-${hide}`);

  return <Tag className={classNames.join(' ')} {...props}>
    {children}
  </Tag>;
}

export default Wrapper;
