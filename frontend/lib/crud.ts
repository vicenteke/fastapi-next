export function setCRUDFormData(formId: string, data: any) {
  const form = document.getElementById(formId);
  if (!form) throw new Error(`No CRUD form with id: ${formId}`);

  for (const key in data) {
    const input = form.querySelector(`input[name='${key}']`);
    if (input) {
      input.value = data[key];
      input.setAttribute('value', data[key]);
    }
  }
}


export function getCRUDFormData(formId: string) {
  const form = document.getElementById(formId);
  if (!form) throw new Error(`No CRUD form with id: ${formId}`);

  const inputs = form.querySelectorAll(`input`);
  const data: any = {};
  for (const input of inputs) {
    data[input.getAttribute('name')] = input.getAttribute('value');
  }

  return data
}


export function clearCRUDFormData(formId: string) {
  const form = document.getElementById(formId);
  if (!form) throw new Error(`No CRUD form with id: ${formId}`);
  const inputs = form.querySelectorAll(`input`);
  inputs.forEach((input) => {
    if (input.getAttribute('name') === 'method' &&
        input.getAttribute('type') === 'hidden') {
      input.value = 'POST';
      input.setAttribute('value', 'POST');
    } else {
      input.value = null;
      input.removeAttribute('value');
    }
  });
}
