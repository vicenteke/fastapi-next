"use client";

import React, { useEffect } from "react";
import { bulmaModalJS, clearClickEventListeners } from '@/lib/bulma.js'

type Props = React.PropsWithChildren<{
  id: string;
}>;


function Modal({ children, id }: Props) {
  useEffect(() => {
    // Adding required JS
    const listeners = bulmaModalJS(id);

    // Clearing event listeners
    return () => {
      clearClickEventListeners(listeners);
    }
  }, [])

  return (
    <div id={id} className="modal">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="card">
          <div className="card-content">
            {children}
          </div>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close"></button>
    </div>
  )
}

export default Modal;
