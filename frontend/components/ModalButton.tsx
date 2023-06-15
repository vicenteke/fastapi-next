"use client";

import React, { useEffect } from "react";
import { bulmaModalTriggerJS, clearClickEventListeners } from '@/lib/bulma.js'
import { ButtonProps } from "@/constants/types";
import Button from "./Button";

interface Props  extends ButtonProps {
  target: string;
};


function ModalButton({ children, target, ...props }: Props) {
  const buttonId = `${target}-button`;
  useEffect(() => {
    // Adding required JS
    const listeners = bulmaModalTriggerJS(buttonId);

    // Clearing event listeners
    return () => {
      clearClickEventListeners(listeners)
    };
  }, [])

  return (
    <Button id={buttonId} className="js-modal-trigger" data-target={target} {...props}>
      {children}
    </Button>
  )
}

export default ModalButton;
