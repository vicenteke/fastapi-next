import React from "react";
import { BulmaColors, BulmaShades, BulmaSizes } from "@/constants/types";


export type Props = React.PropsWithChildren<{
  htmlTag?: keyof JSX.IntrinsicElements
  color?: BulmaColors | BulmaShades
  ancestor?: boolean
  parent?: boolean
  child?: boolean
  vertical?: boolean
  box?: boolean
  notification?: boolean
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
}>;


/* Description: implementation of Bulma's Tile component, used for creating
 * bidimensional grids. It's essentially very similar to the columns, but the
 * heights are made to match, so the final aesthetic is Metro-like,
 * Pinterest-like, or whatever-you-like.
 * 
 * To create a tile grid:
 * - ancestor: the root of a grid, roughly equivalent to a 'row'. Ancestors
 *             shouldn't be nested. They will expand to 100% width. Tiles
 *             inside them will be arranged horizontally (add an extra layer
 *             with a vertical tile to create vertical styles).
 * - parent: will force each 'child' (specified with the child prop) to have
 *           the same height as the heighest child;
 * - child: the final tile layer where the actual content is inserted;
 * 
 * To create several levels of nesting, use a root ancestor, then use normal
 * tiles as you want. On the leaf components add a child tile and make it's
 * parent an actual parent tile.
 * 
 * Props:
 * - htmlTag?: the HTML tag (default: div);
 * - color?: background color (note that it will );
 * - size?: width according to a 12 columns grid;
 * - ancestor?: make the tile an ancestor (root tile);
 * - child?: where the actual content is inserted;
 * - parent?: direct parents of children tiles;
 * - vertical?: arrange tiles vertically;
 * - box?: make the tile a bulma box;
 * - notification?: make the tile a bulma notification (rounded corners);
 */
const Tile: React.FunctionComponent<Props & React.HTMLAttributes<HTMLOrSVGElement>> = ({
  htmlTag: Tag = 'div',
  color,
  ancestor,
  parent,
  child,
  vertical,
  box,
  notification,
  size,
  className,
  children,
  ...props
}) => {
  const classNames = ['tile'];
  if (className) classNames.push(className);
  if (color) {
    if (notification) classNames.push(`is-${color}`);
    else classNames.push(`has-background-${color}`);
  }
  if (size) classNames.push(`is-${size}`);
  if (ancestor) classNames.push('is-ancestor');
  if (parent) classNames.push('is-parent');
  if (child) classNames.push('is-child');
  if (vertical) classNames.push('is-vertical');
  if (box) classNames.push('box');
  if (notification) classNames.push('notification');

  return <Tag className={classNames.join(' ')} {...props}>
    {children}
  </Tag>;
}

export default Tile;
