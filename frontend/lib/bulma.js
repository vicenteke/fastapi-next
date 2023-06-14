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
// Functions to open and close a modal
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
  const modal = triggerElement.dataset.target;
  const $target = document.getElementById(modal);

  const listener = () => {
    openModal($target);
  }
    triggerElement.addEventListener('click', listener);
  return [[triggerElement, listener]]
}

export function bulmaModalJS(modalId) {
  // Adds methods for a modal
  let listenerList = [];  // Array containing [element, listener]
  const elements = document.querySelectorAll(
    `#${modalId} .modal-background,
     #${modalId} .modal-close,
     #${modalId} .modal-card-head .delete,
     #${modalId} .modal-card-foot .button`
    ) || [];

  // Add a click event on various child elements to close the parent modal
  elements.forEach(($close) => {
    const $target = $close.closest('.modal');
    const listener = () => closeModal($target);
    listenerList.push([$close, listener])
    $close.addEventListener('click', listener);
  });
  return listenerList;
}
