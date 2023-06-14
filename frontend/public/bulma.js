/* Adding JS required to make BulmaCSS functional */

// Helpers -------------------------------------------------------------------
function closeModal(modalId) {
  let modal = modalId;
  if (typeof modalId === 'string')
    modal = document.getElementById(modalId);
  modal.classList.remove('is-active');
}

function closeAllModals() {
  (document.querySelectorAll('.modal') || []).forEach(($modal) => {
    closeModal($modal);
  });
}


// MAIN ----------------------------------------------------------------------
if (typeof document !== typeof undefined) {
  const loadBulma = () => {
    console.log('Loading BulmaJS...');

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;
  
      if (e.keyCode === 27) { // Escape key
        closeAllModals();
      }
    });
  };

  if (document.readyState !== 'loading')
    loadBulma();
  else
    document.addEventListener('DOMContentLoaded', () => loadBulma());
}
