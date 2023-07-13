export function setCRUDFormData(formId: string, data: any) {
  const form = document.getElementById(formId);
  if (!form) throw new Error(`No CRUD form with id: ${formId}`);

  for (const key in data) {
    const input = form.querySelector(`input[name='${key}']`);
    if (input)
      input.setAttribute('value', data[key]);
  }
}


export function clearCRUDFormData(formId: string) {
  const form = document.getElementById(formId);
  if (!form) throw new Error(`No CRUD form with id: ${formId}`);
  const inputs = form.querySelectorAll(`input`);
  inputs.forEach((input) => {
    input.removeAttribute('value');
  });
}
