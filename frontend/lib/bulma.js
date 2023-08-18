/* JS required to make BulmaCSS functional */

// GENERAL -------------------------------------------------------------------
export function clearClickEventListeners(listenerList) {
  // Remove event listeners from an array conaining [element, listener]
  for (let [element, listener] of listenerList)
    element.removeEventListener('click', listener);
}


// NAVBAR --------------------------------------------------------------------
export function bulmaNavbarJS(navbarId){
  // Create required JS for mobile navbar
  const navbar = document.getElementById(navbarId);
  const listener = () => {
    // Get the target from the "data-target" attribute
    const target = navbar.dataset.target;
    const $target = document.getElementById(target);

    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    navbar.classList.toggle('is-active');
    $target.classList.toggle('is-active');
  };
  navbar.addEventListener('click', listener);
  return [[navbar, listener]];
}


// MODAL ---------------------------------------------------------------------
// Functions to manage modals
export function setModalTitle(modalId, title) {
  let modal = modalId;
  let modalTitle = null;
  if (typeof modalId === 'string')
    modalTitle = document.querySelector(`#${modalId} .title`);
  else
    modalTitle = modal.querySelector('.title');
  if (modalTitle)
    modalTitle.html = title;
}

export function setModalContent(modalId, content) {
  let modal = modalId;
  let modalContent = null;
  if (typeof modalId === 'string')
    modalContent = document.querySelector(`#${modalId} .modal-children`);
  else
    modalContent = modal.querySelector('.modal-children');
  if (modalContent)
    modalContent.innerHTML = content;
}

export function openModal(modalId) {
  let modal = modalId;
  if (typeof modalId === 'string')
    modal = document.getElementById(modalId);
  modal.classList.add('is-active');
}

export function closeModal(modalId) {
  let modal = modalId;
  if (typeof modalId === 'string')
    modal = document.getElementById(modalId);
  modal.classList.remove('is-active');
}

export function closeAllModals() {
  (document.querySelectorAll('.modal') || []).forEach(($modal) => {
    closeModal($modal);
  });
}

export function bulmaModalTriggerJS(triggerElementId) {
  // Add a click event on buttons (or any element) to open a specific modal
  const triggerElement = document.getElementById(triggerElementId);
  if (!triggerElement)
    throw new Error(`Unable to find modal trigger with id "${triggerElementId}"`);
  const modal = triggerElement.dataset.target;
  const $target = document.getElementById(modal);

  const listener = () => {
    openModal($target);
  }
  triggerElement.addEventListener('click', listener);
  return [[triggerElement, listener]];
}

export function bulmaModalJS(modalId) {
  // Adds methods for a modal
  let listenerList = [];  // Array containing [element, listener]
  const elements = document.querySelectorAll(
    `#${modalId} .modal-background,
     #${modalId} .modal-close,
     #${modalId} .delete,
     #${modalId} .modal-card-foot .button`
    ) || [];

  // Add a click event on various child elements to close the parent modal
  elements.forEach(($close) => {
    const $target = $close.closest('.modal');
    const listener = () => closeModal($target);
    listenerList.push([$close, listener]);
    $close.addEventListener('click', listener);
  });
  return listenerList;
}

// NOTIFICATION ---------------------------------------------------------------------
export function bulmaNotificationJS(notificationId) {
  let listenerList = [];
  const $delete = document.querySelector(`#${notificationId}.notification .delete`);
  if (!$delete) return [];
  const $notification = $delete.parentNode;
  if (!$notification) return [];

  const listener = () => {
    $notification.parentNode.removeChild($notification);
  };
  listenerList.push([$delete, listener]);
  $delete.addEventListener('click', listener);
  return listenerList;
}
