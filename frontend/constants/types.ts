const bulmaColors = ['primary', 'link', 'info', 'success', 'warning', 'danger'] as const;
const bulmaShades = ['white', 'light', 'dark', 'black'] as const;
const bulmaSizes = ['small', 'normal', 'medium', 'large'] as const;
const bulmaStyles = ['outlined', 'inverted', 'rounded'] as const;
const bulmaStates = ['hovered', 'focused', 'loading'] as const;
const alertTypes = ['success', 'warning', 'info', 'danger', 'default'] as const;
const inputTypes = ['text', 'password', 'email', 'tel', 'none', 'hidden'] as const; // Supported input types
const columnSizes = [
  'half', 'full', 'one-quarter', 'three-quarters', 'one-third', 'two-thirds',
  'one-fifth', 'two-fifths', 'three-fifths', 'four-fifths', '1', '2', '3', '4',
  '5', '6', '7', '8', '9', '10', '11', '12'
] as const;
const breakpoints = ['mobile', 'tablet', 'touch', 'desktop', 'widescreen', 'fullhd'] as const;
const columnGaps = [0, 1, 2, 3, 4, 5, 6, 7, 8] as const;

const stringColumnSizes = columnSizes.concat(
  breakpoints.reduce((res, bp) => res.concat(columnSizes.map((size) => `${size}-${bp}`)), Array())
);

const allColumnGaps = breakpoints.reduce(
  (res, bp) => res.concat(columnGaps.map((size) => `${size}-${bp}`)), Array()
).concat(columnGaps);

export type BulmaBreakpoints = (typeof breakpoints)[number];
export type BulmaColors = (typeof bulmaColors)[number];
export type BulmaShades = (typeof bulmaShades)[number];
export type BulmaSizes = (typeof bulmaSizes)[number];
export type BulmaStyles = (typeof bulmaStyles)[number];
export type BulmaStates = (typeof bulmaStates)[number];
export type BulmaColumnSizes = (typeof stringColumnSizes)[number] | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type BulmaColumnGaps = (typeof allColumnGaps)[number];
export type AlertTypes = (typeof alertTypes)[number];
export type InputTypes = (typeof inputTypes)[number];

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  className?: string;
  color?: BulmaColors | BulmaShades | 'text' | 'ghost' | 'normal' | string;
  size?: BulmaSizes;
  variant?: BulmaStyles;
  href?: string;
  isLight?: boolean;
  isResponsive?: boolean;
  isFullWidth?: boolean;
  isHovered?: boolean;
  isFocused?: boolean;
  isActive?: boolean;
  isLoading?: boolean;
  isStatic?: boolean;
};


export interface NavbarProps extends React.ComponentPropsWithoutRef<'nav'> {
  id: string;
  color?: BulmaColors | BulmaShades | 'transparent' | string;
  isFixedTop?: boolean;
  isFixedBottom?: boolean;
  isSpaced?: boolean;
  hasShadow?: boolean;
};


export function alertTypeToBulmaColor(type: AlertTypes): BulmaColors {
  if (type === 'default')
    return 'primary';
  return type;
}
