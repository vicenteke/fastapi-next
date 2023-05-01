import React from "react";

import { ButtonProps } from "@/constants/types";
import Button from "./Button";

interface Props  extends ButtonProps {
  target: string
};


function ModalButton({ children, target, ...props }: Props) {

    return (
      <Button className="js-modal-trigger" data-target={target} {...props}>
        {children}
      </Button>
    )
}

export default ModalButton;
