const bulmaColors = ['primary', 'link', 'info', 'success', 'warning', 'danger'] as const;
const bulmaColorsLight = [
  'primary-light', 'link-light', 'info-light', 'success-light',
  'warning-light', 'danger-light'] as const;
const bulmaColorsDark = [
  'primary-dark', 'link-dark', 'info-dark', 'success-dark', 'warning-dark',
  'danger-dark'] as const;
const bulmaGreyColors = [
  'black-bis', 'black-ter', 'grey-darker', 'grey-dark', 'grey', 'grey-light',
  'grey-lighter', 'white-ter', 'white-bis'] as const;
const bulmaShades = ['white', 'light', 'dark', 'black'] as const;
const bulmaSizes = ['small', 'normal', 'medium', 'large'] as const;
const bulmaStyles = ['outlined', 'inverted', 'rounded'] as const;
const bulmaStates = ['hovered', 'focused', 'loading'] as const;
const bulmaTextAlign = [
  'centered', 'centered-mobile', 'centered-touch', 'centered-tablet-only',
  'centered-tablet', 'centered-desktop-only', 'centered-desktop',
  'centered-widescreen-only', 'centered-widescreen', 'centered-fullhd',
  'justified', 'justified-mobile', 'justified-touch', 'justified-tablet-only',
  'justified-tablet', 'justified-desktop-only', 'justified-desktop',
  'justified-widescreen-only', 'justified-widescreen', 'justified-fullhd',
  'left', 'left-mobile', 'left-touch', 'left-tablet-only', 'left-tablet',
  'left-desktop-only', 'left-desktop', 'left-widescreen-only', 'left-widescreen',
  'left-fullhd', 'right', 'right-mobile', 'right-touch', 'right-tablet-only',
  'right-tablet', 'right-desktop-only', 'right-desktop', 'right-widescreen-only',
  'right-widescreen', 'right-fullhd',
] as const;
const bulmaSpacing = ['0', '1', '2', '3', '4', '5', '6', 'auto', 0, 1, 2, 3, 4, 5, 6] as const;
const alertTypes = ['success', 'warning', 'info', 'danger', 'default'] as const;
const inputTypes = ['text', 'password', 'email', 'tel', 'none', 'hidden'] as const; // Supported input types
const breakpoints = ['mobile', 'tablet', 'touch', 'desktop', 'widescreen', 'fullhd'] as const;
const columnSizes = [
  'half', 'full', 'one-quarter', 'three-quarters', 'one-third', 'two-thirds',
  'one-fifth', 'two-fifths', 'three-fifths', 'four-fifths', '1', '2', '3', '4',
  '5', '6', '7', '8', '9', '10', '11', '12', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
  12,

  // Mobile
  'half-mobile', 'full-mobile', 'one-quarter-mobile', 'three-quarters-mobile',
  'one-third-mobile', 'two-thirds-mobile', 'one-fifth-mobile', 'two-fifths-mobile',
  'three-fifths-mobile', 'four-fifths-mobile', '1-mobile', '2-mobile', '3-mobile',
  '4-mobile', '5-mobile', '6-mobile', '7-mobile', '8-mobile', '9-mobile',
  '10-mobile', '11-mobile', '12-mobile',

  // Tablet
  'half-tablet', 'full-tablet', 'one-quarter-tablet', 'three-quarters-tablet',
  'one-third-tablet', 'two-thirds-tablet', 'one-fifth-tablet', 'two-fifths-tablet',
  'three-fifths-tablet', 'four-fifths-tablet', '1-tablet', '2-tablet', '3-tablet',
  '4-tablet', '5-tablet', '6-tablet', '7-tablet', '8-tablet', '9-tablet',
  '10-tablet', '11-tablet', '12-tablet',

  // Touch
  'half-touch', 'full-touch', 'one-quarter-touch', 'three-quarters-touch',
  'one-third-touch', 'two-thirds-touch', 'one-fifth-touch', 'two-fifths-touch',
  'three-fifths-touch', 'four-fifths-touch', '1-touch', '2-touch', '3-touch',
  '4-touch', '5-touch', '6-touch', '7-touch', '8-touch', '9-touch', '10-touch',
  '11-touch', '12-touch',

  // Desktop
  'half-desktop', 'full-desktop', 'one-quarter-desktop', 'three-quarters-desktop',
  'one-third-desktop', 'two-thirds-desktop', 'one-fifth-desktop', 'two-fifths-desktop',
  'three-fifths-desktop', 'four-fifths-desktop', '1-desktop', '2-desktop', '3-desktop',
  '4-desktop', '5-desktop', '6-desktop', '7-desktop', '8-desktop', '9-desktop',
  '10-desktop', '11-desktop', '12-desktop',

  // Widescreen
  'half-widescreen', 'full-widescreen', 'one-quarter-widescreen',
  'three-quarters-widescreen', 'one-third-widescreen', 'two-thirds-widescreen',
  'one-fifth-widescreen', 'two-fifths-widescreen', 'three-fifths-widescreen',
  'four-fifths-widescreen', '1-widescreen', '2-widescreen', '3-widescreen',
  '4-widescreen', '5-widescreen', '6-widescreen', '7-widescreen', '8-widescreen',
  '9-widescreen', '10-widescreen', '11-widescreen', '12-widescreen',

  // FullHD
  'half-fullhd', 'full-fullhd', 'one-quarter-fullhd', 'three-quarters-fullhd',
  'one-third-fullhd', 'two-thirds-fullhd', 'one-fifth-fullhd', 'two-fifths-fullhd',
  'three-fifths-fullhd', 'four-fifths-fullhd', '1-fullhd', '2-fullhd', '3-fullhd',
  '4-fullhd', '5-fullhd', '6-fullhd', '7-fullhd', '8-fullhd', '9-fullhd', '10-fullhd',
  '11-fullhd', '12-fullhd',
] as const;
const columnGaps = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, '0', '1', '2', '3', '4', '5', '6', '7', '8',
  '0-mobile', '1-mobile', '2-mobile', '3-mobile', '4-mobile', '5-mobile',
  '6-mobile', '7-mobile', '8-mobile',

  '0-tablet', '1-tablet', '2-tablet', '3-tablet', '4-tablet', '5-tablet',
  '6-tablet', '7-tablet', '8-tablet',

  '0-touch', '1-touch', '2-touch', '3-touch', '4-touch', '5-touch', '6-touch',
  '7-touch', '8-touch',

  '0-desktop', '1-desktop', '2-desktop', '3-desktop', '4-desktop', '5-desktop',
  '6-desktop', '7-desktop', '8-desktop',

  '0-widescreen', '1-widescreen', '2-widescreen', '3-widescreen', '4-widescreen',
  '5-widescreen', '6-widescreen', '7-widescreen', '8-widescreen',

  '0-fullhd', '1-fullhd', '2-fullhd', '3-fullhd', '4-fullhd', '5-fullhd',
  '6-fullhd', '7-fullhd', '8-fullhd',
] as const;
const bulmaDisplay = [
  'block-mobile', 'block-tablet', 'block-touch', 'block-desktop', 'block-widescreen',
  'block-fullhd', 'block-tablet-only', 'block-desktop-ony', 'block-widescreen-only',
  'inline-mobile', 'inline-tablet', 'inline-touch', 'inline-desktop', 'inline-widescreen',
  'inline-fullhd', 'inline-tablet-only', 'inline-desktop-ony', 'inline-widescreen-only',
  'inline-block-mobile', 'inline-block-tablet', 'inline-block-touch', 'inline-block-desktop', 'inline-block-widescreen',
  'inline-block-fullhd', 'inline-block-tablet-only', 'inline-block-desktop-ony', 'inline-block-widescreen-only',
  'inline-flex-mobile', 'inline-flex-tablet', 'inline-flex-touch', 'inline-flex-desktop', 'inline-flex-widescreen',
  'inline-flex-fullhd', 'inline-flex-tablet-only', 'inline-flex-desktop-ony', 'inline-flex-widescreen-only',
  'flex-mobile', 'flex-tablet', 'flex-touch', 'flex-desktop', 'flex-widescreen',
  'flex-fullhd', 'flex-tablet-only', 'flex-desktop-ony', 'flex-widescreen-only',
] as const;

const bulmaTextSize = [
  1, 2, 3, 4, 5, 6, '1', '2', '3', '4', '5', '6',
  '1-mobile', '2-mobile', '3-mobile', '4-mobile', '5-mobile', '6-mobile',
  '1-tablet', '2-tablet', '3-tablet', '4-tablet', '5-tablet', '6-tablet',
  '1-touch', '2-touch', '3-touch', '4-touch', '5-touch', '6-touch',
  '1-desktop', '2-desktop', '3-desktop', '4-desktop', '5-desktop', '6-desktop',
  '1-widescreen', '2-widescreen', '3-widescreen', '4-widescreen', '5-widescreen', '6-widescreen',
  '1-fullhd', '2-fullhd', '3-fullhd', '4-fullhd', '5-fullhd', '6-fullhd',
] as const;

export type BulmaBreakpoints = (typeof breakpoints)[number];
export type BulmaDisplay = (typeof bulmaDisplay)[number];
export type BulmaColors = (typeof bulmaColors)[number];
export type BulmaColorsLight = (typeof bulmaColorsLight)[number];
export type BulmaColorsDark = (typeof bulmaColorsDark)[number];
export type BulmaGreyColors = (typeof bulmaGreyColors)[number];
export type BulmaShades = (typeof bulmaShades)[number];
export type BulmaSizes = (typeof bulmaSizes)[number];
export type BulmaStyles = (typeof bulmaStyles)[number];
export type BulmaStates = (typeof bulmaStates)[number];
export type BulmaTextAlign = (typeof bulmaTextAlign)[number];
export type BulmaTextSize = (typeof bulmaTextSize)[number];
export type BulmaSpacing = (typeof bulmaSpacing)[number];
export type BulmaColumnSizes = (typeof columnSizes)[number];
export type BulmaColumnGaps = (typeof columnGaps)[number];
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


type InternalWrapperProps = React.PropsWithChildren<{
  htmlTag?: keyof JSX.IntrinsicElements
  textColor?: BulmaColors | BulmaShades | BulmaColorsLight | BulmaColorsDark | BulmaGreyColors
  backgroundColor?: BulmaColors | BulmaShades | BulmaColorsLight | BulmaColorsDark | BulmaGreyColors
  margin?: BulmaSpacing
  marginTop?: BulmaSpacing
  marginBottom?: BulmaSpacing
  marginLeft?: BulmaSpacing
  marginRight?: BulmaSpacing
  marginX?: BulmaSpacing
  marginY?: BulmaSpacing
  padding?: BulmaSpacing
  paddingTop?: BulmaSpacing
  paddingBottom?: BulmaSpacing
  paddingLeft?: BulmaSpacing
  paddingRight?: BulmaSpacing
  paddingX?: BulmaSpacing
  paddingY?: BulmaSpacing
  textAlign?: BulmaTextAlign | BulmaTextAlign[]
  capitalized?: boolean
  lowercase?: boolean
  uppercase?: boolean
  italic?: boolean
  underlined?: boolean
  textWeight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  fontFamily?: 'sans-serif' | 'monospace' | 'code' | 'primary' | 'secondary'
  show?: BulmaDisplay | BulmaDisplay[]
  hide?: BulmaDisplay | BulmaDisplay[]
  invisible?: boolean
  hidden?: boolean
  srOnly?: boolean
  clearfix?: boolean
  pulledLeft?: boolean
  pulledRight?: boolean
  overlay?: boolean
  clipped?: boolean
  radiusless?: boolean
  shadowless?: boolean
  unselectable?: boolean
  clickable?: boolean
  relative?: boolean
}>;

export type WrapperProps = InternalWrapperProps & React.HTMLAttributes<HTMLOrSVGElement>;


export function alertTypeToBulmaColor(type: AlertTypes): BulmaColors {
  if (type === 'default')
    return 'primary';
  return type;
}
