export function setCRUDFormData(formId: string, data: any) {
  const form = document.getElementById(formId);
  console.log('>>>>>>>>>>>>', formId, data, form);
  if (!form) throw new Error(`No CRUD form with id: ${formId}`)

  for (const key in data) {
    const input = form.querySelector(`input[name='${key}']`);
    if (input)
      input.setAttribute('value', data[key]);
  }
}
