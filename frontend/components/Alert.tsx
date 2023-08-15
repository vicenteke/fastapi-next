"use client";
import React, { useEffect } from 'react';
import { bulmaModalJS, clearClickEventListeners, closeModal } from '@/lib/bulma.js'
import { AlertTypes, alertTypeToBulmaColor } from '@/constants/types';
import {
  IconDefinition,
  faTimesCircle,
  faCheckCircle,
  faTriangleExclamation,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import Button from './Button';
import Column from './Column';
import Columns from './Columns';
import Icon from './Icon';
import styles from "@/styles/Alert.module.scss";


type Props = React.PropsWithChildren<{
  id: string;
  type?: AlertTypes;
  title?: string;
  confirm?: string | boolean;
  cancel?: string | boolean;
  onConfirm?: Function;
  onCancel?: Function;
  icon?: null | AlertTypes | IconDefinition;
}>;

/* Description: Alert components are modals used for feedback and dialogs.
 * There are default styles, but they can be easily adapted by providing custom
 * icons, button descriptions, title, content, and so on.
 * Props:
 * - id [required]: modal ID required for BulmaJS;
 * - type: defines which default style to use;
 * - title: bolder, centered text below the icon;
 * - confirm: text for the confirm button. If set to true, will use a default
 *            text;
 * - cancel: text for the cancel button. If set to true, will use a default
 *           text;
 * - onConfirm: optional method to be executed when pressing the confirm button;
 * - onCancel: optional method to be executed when pressing the cancel button;
 * - icon: a custom icon can be passed using this prop.
 */
function Alert({
  id,
  title,
  type='default',
  icon,
  confirm,
  cancel,
  onConfirm,
  onCancel,
  children,
}: Props) {

  let iconSymbol: IconDefinition = faInfoCircle;

  // Default values
  if ((!confirm && onConfirm) || confirm === true)
    confirm = "OK";
  if ((!cancel && onCancel) || cancel === true) 
    cancel = "Cancel";
  if (!icon)
    icon = type === 'default' ? null : type;
  else if (icon === 'default')
    icon = null;

  if (icon) {
    if (typeof icon === 'string') {
      if (icon === 'success')
        iconSymbol = faCheckCircle;
      else if (icon === 'warning')
        iconSymbol = faTriangleExclamation;
      else if (icon === 'danger')
        iconSymbol = faTimesCircle;
      else if (icon === 'info')
        iconSymbol = faInfoCircle;
    } else {
      iconSymbol = icon;
      icon = type === 'default' ? 'info' : type;
    }
  }

  useEffect(() => {
    // Adding required JS
    const listeners = bulmaModalJS(id);

    // Clearing event listeners
    return () => {
      clearClickEventListeners(listeners);
    }
  }, [])

  const handleConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onConfirm)
      onConfirm();
    closeModal(id);
  }

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onCancel)
      onCancel();
    closeModal(id);
  }

  return (
    <div id={id} className={`modal ${styles.modal}`}>
      <div className="modal-background"></div>
      <div className={`modal-content ${styles.modalContent}`}>
        <div className="card">
          <div className="card-content">
            {icon &&
            <Columns center vCenter className='my-2'>
              <Column size={5} className='level mb-2'>
                <Icon
                  icon={iconSymbol}
                  color={icon}
                  size='large'
                  className={`level-item ${styles.icon}`}
                  iconSize={6}/>
              </Column>
            </Columns>
            }
            {title && <p className="title has-text-centered">{title}</p>}
            <div className='modal-children'>{children}</div>
            <Columns multiline vCenter className='mt-4'>
              {cancel &&
                <Column>
                  <Button color='normal' onClick={handleConfirm} isFullWidth>
                    {cancel}
                  </Button>
                </Column>
              }
              {confirm &&
                <Column>
                  <Button
                    color={alertTypeToBulmaColor(type)}
                    onClick={handleCancel}
                    isFullWidth
                    >
                    {confirm}
                  </Button>
                </Column>
              }
            </Columns>
          </div>
        </div>
      </div>
      <button className="modal-close is-large" aria-label="close"></button>
    </div>
  )
}

export default Alert;
