"use client";

import React, { useEffect, useState, useId } from "react";
import { bulmaModalTriggerJS, clearClickEventListeners } from '@/lib/bulma.js'
import { ButtonProps } from "@/constants/types";
import Button from "./Button";
import { decodeId } from "@/lib/random";

interface Props extends ButtonProps {
  target: string;
};


/* Description: a button that also opens a modal.
 * Props:
 * - target: modal's id;
 */
function ModalButton({ children, target, onClick, ...props }: Props) {
  const id = props.id || useId();
  const buttonId = decodeId(id) + (props.key || '');

  useEffect(() => {
    // Adding required JS
    const listeners = bulmaModalTriggerJS(buttonId);

    // Clearing event listeners
    return () => {
      clearClickEventListeners(listeners)
    };
  }, [buttonId])

  return (
    <Button id={buttonId} className="js-modal-trigger" data-target={target} onClick={onClick} {...props}>
      {children}
    </Button>
  )
}

export default ModalButton;
