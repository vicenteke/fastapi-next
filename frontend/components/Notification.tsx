"use client";

import React, { useEffect } from "react";
import { bulmaNotificationJS, clearClickEventListeners } from '@/lib/bulma.js'
import { generateId } from '@/lib/random';
import { BulmaColors, BulmaShades } from "@/constants/types";
import Delete from "./Delete";


export type Props = React.PropsWithChildren<{
  className?: string
  includeClose?: boolean
  onClose?: () => void
  color?: BulmaColors | BulmaShades
  light?: boolean
}>;


/* Description: a button that also opens a modal.
 * Props:
 * - includeClose?: if it should include a close button (overriden if onClose is defined);
 * - onClose?: method to be executed when notification is closed;
 * - color?: notification color;
 * - light?: use lighter shade for notification color;
 */
function Notification({
  children,
  className,
  includeClose,
  onClose,
  color,
  light,
  ...props
}: Props) {
  const id = props.id || generateId();
  useEffect(() => {
    // Adding required JS
    const listeners = bulmaNotificationJS(id);

    // Clearing event listeners
    return () => {
      clearClickEventListeners(listeners)
    };
  }, [id])

  const classNames = ['notification'];
  if (className) classNames.push(className);
  if (light) classNames.push('is-light');
  if (color) classNames.push(`is-${color}`);

  return (<div id={id} className={classNames.join(' ')} {...props}>
    {(includeClose || onClose) && <Delete onClick={() => {if (onClose) onClose()}}></Delete>}
    {children}
  </div>)
}

export default Notification;
