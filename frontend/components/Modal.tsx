import React from "react";

type Props = React.PropsWithChildren<{
  id?: string
}>;


function Modal({ children, id="" }: Props) {
    return (
      <div id={id} className="modal">
        <div className="modal-background"></div>
        <div className="modal-content">
          {children}
        </div>
        <button className="modal-close is-large" aria-label="close"></button>
      </div>
    )
}

export default Modal;
