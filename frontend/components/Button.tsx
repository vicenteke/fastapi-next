import React from "react";
import Link from "next/link";
import { ButtonProps } from '@/constants/types'


function Button({
  children,
  className="",
  color="primary",
  size=undefined,
  variant=undefined,
  href=undefined,
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

  let classNames = [className, 'button'];
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

  if (href) {
    return (
      <Link className={classNames.join(" ")} href={href}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classNames.join(" ")} {...props}>
      {children}
    </button>
  )
}

export default Button;
