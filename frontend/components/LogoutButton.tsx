"use client";

import React from "react";
import { ButtonProps } from '@/constants/types'
import { deleteToken } from "@/lib/token";
import Button from "./Button";


/* Description: just a logout button. It implements the same Button interface.
 */
function LogoutButton({
  children,
  onClick,
  ...props
}: ButtonProps) {
  function handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
    deleteToken();
    if (onClick)
      onClick(event);
    window.location.reload();
  }

  return (
    <Button {...props} onClick={handleClick}>
      {children || 'Logout'}
    </Button>
  )
}

export default LogoutButton;
