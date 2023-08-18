"use client";

import React, { useEffect } from "react";
import { bulmaModalJS, clearClickEventListeners } from '@/lib/bulma.js'
import Delete from "./Delete";
import Container from "./Container";

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
              {/* <button className="modal-close is-large" aria-label="close"></button> */}
          <div className="card-content">
            <div className="has-text-right" style={{ width: '100%' }}>
              <Delete/>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal;
