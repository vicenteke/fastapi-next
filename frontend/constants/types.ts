export type BulmaColors = "primary" | "link" | "info" | "success" | "warning" | "danger";
export type BulmaShades = "white" | "light" | "dark" | "black";
export type BulmaSizes = "small" | "normal" | "medium" | "large";
export type BulmaStyles = "outlined" | "inverted" | "rounded";

export interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  className?: string,
  color?: BulmaColors | BulmaShades | "text" | "ghost" | string,
  size?: BulmaSizes,
  variant?: BulmaStyles,
  isLight?: boolean,
  isResponsive?: boolean,
  isFullWidth?: boolean,
  isHovered?: boolean,
  isFocused?: boolean,
  isActive?: boolean,
  isLoading?: boolean,
  isStatic?: boolean,
};
