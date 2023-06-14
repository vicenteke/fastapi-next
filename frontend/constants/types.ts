export type BulmaColors = "primary" | "link" | "info" | "success" | "warning" | "danger";
export type BulmaShades = "white" | "light" | "dark" | "black";
export type BulmaSizes = "small" | "normal" | "medium" | "large";
export type BulmaStyles = "outlined" | "inverted" | "rounded";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  className?: string,
  color?: BulmaColors | BulmaShades | "text" | "ghost" | string,
  size?: BulmaSizes,
  variant?: BulmaStyles,
  href?: string,
  isLight?: boolean,
  isResponsive?: boolean,
  isFullWidth?: boolean,
  isHovered?: boolean,
  isFocused?: boolean,
  isActive?: boolean,
  isLoading?: boolean,
  isStatic?: boolean,
};


export interface NavbarProps extends React.ComponentPropsWithoutRef<"nav"> {
  color?: BulmaColors | BulmaShades | "transparent" | string,
  isFixedTop?: boolean,
  isFixedBottom?: boolean,
  isSpaced?: boolean,
  hasShadow?: boolean,
};
