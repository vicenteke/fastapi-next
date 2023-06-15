const bulmaColors = ['primary', 'link', 'info', 'success', 'warning', 'danger'] as const;
const bulmaShades = ['white', 'light', 'dark', 'black'] as const;
const bulmaSizes = ['small', 'normal', 'medium', 'large'] as const;
const bulmaStyles = ['outlined', 'inverted', 'rounded'] as const;
const alertTypes = ['success', 'warning', 'info', 'danger', 'default'] as const;

export type BulmaColors = (typeof bulmaColors)[number];
export type BulmaShades = (typeof bulmaShades)[number];
export type BulmaSizes = (typeof bulmaSizes)[number];
export type BulmaStyles = (typeof bulmaStyles)[number];
export type AlertTypes = (typeof alertTypes)[number];

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
