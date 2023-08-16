"use client";

import { TableColumnProps } from "@/hooks/crud";
import Button from "./Button";
import Input from "./Input";
import fetchServer from "@/lib/fetch";
import { getCRUDFormData } from "@/lib/crud";
import { closeModal } from "@/lib/bulma";
import Block from "./Block";


interface Props {
  id: string
  fields: Array<TableColumnProps>
  route?: string
  modalId?: string
  onSubmit?: (data: any) => void
  afterSubmit?: (data: any) => void
}


/* Description: generates a form for a CRUD based on a route and some fields
 * 
 */
function CRUDForm({
  route,
  fields,
  id,
  modalId,
  onSubmit,
  afterSubmit,
}: Props) {
  if (!route && !onSubmit) {
    throw new Error('CRUDForm requires either a route or an onSubmit method!');
  }

  const handleSubmit = () => {
    const data = getCRUDFormData(id);
    const method = data.method || 'POST';
    delete data.method;
    const uri = method === 'POST' ? route : `${route}/${data.pk}`;
    // if onSubmit, use that method, otherwise send data to route
    if (onSubmit) return onSubmit(data);
    if (modalId) closeModal(modalId);
    fetchServer(
      uri,
      {
        payload: data,
        method: method,
        onSuccess: afterSubmit,
      },
    )
  }

  return <Block id={id}>
    <Input
      key={10000}
      name='method'
      label='method'
      type='hidden'
    />
    {fields.map((entry, index) => {
      if (entry.customInput)
        return entry.customInput;

      if (entry.type === 'none')
        return <></>

      return <Input
        key={index}
        name={entry.tableColumn}
        label={entry.name}
        type={entry.type}
        {...entry.inputProps}
      />;
    })}
    <Button onClick={handleSubmit} isFullWidth>Save</Button>
  </Block>
}

export default CRUDForm;