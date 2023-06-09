import React from "react";
import { ButtonProps } from '@/constants/types'


function Button({
  children,
  className="",
  color=undefined,
  size=undefined,
  variant=undefined,
  isLight=false,
  isResponsive=true,
  isFullWidth=false,
  isHovered=false,
  isFocused=false,
  isActive=false,
  isLoading=false,
  isStatic=false,
  ...props
}: ButtonProps) {

  let classNames = [className];
  if (typeof color === 'string') classNames.push("is-" + color)
  if (typeof size === 'string') classNames.push("is-" + size)
  if (typeof variant === 'string') classNames.push("is-" + variant)
  if (isLight) classNames.push("is-light")
  if (isResponsive) classNames.push("is-responsive")
  if (isFullWidth) classNames.push("is-fullwidth")
  if (isHovered) classNames.push("is-hovered")
  if (isFocused) classNames.push("is-focused")
  if (isActive) classNames.push("is-active")
  if (isLoading) classNames.push("is-loading")
  if (isStatic) classNames.push("is-static")

  return (
    <button className={classNames.join(" ")} {...props}>
      {children}
    </button>
  )
}

export default Button;
