"use client";

import React from "react";

type Props = React.PropsWithChildren<{
  id: string;
}>;


function Modal({ children, id }: Props) {
  // TODO
  return (
    <div id={id} className="modal">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="card">
              {/* <button className="modal-close is-large" aria-label="close"></button> */}
          <div className="card-content">
            <div className="has-text-right" style={{ width: '100%' }}>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal;
