"use client";

import { TableColumnProps } from "./CRUD";
import Button from "./Button";
import Input from "./Input";
import fetchServer from "@/lib/fetch";
import { getCRUDFormData } from "@/lib/crud";
import { closeModal } from "@/lib/bulma";


interface Props {
  id: string
  fields: Array<TableColumnProps>
  route?: string
  onSubmit?: (data: any) => void
}


/* Description: generates a form for a CRUD based on a route and some fields
 * 
 */
function CRUDForm({
  route,
  fields,
  // values,
  onSubmit,
  id,
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
    closeModal(id);
    fetchServer(
      uri,
      {
        payload: data,
        method: method,
      }
    )
  }

  return <div className="block" id={id}>
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
  </div>
}

export default CRUDForm;