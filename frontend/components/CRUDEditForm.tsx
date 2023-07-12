"use client";

import { useState } from "react";

import { TableColumnProps } from "./CRUD";
import Button from "./Button";
import Input from "./Input";
import fetchServer from "@/lib/fetch";


interface ColumnProps {
  tableColumn: string
  value?: any
}

interface Props {
  fields: Array<TableColumnProps>
  values: Array<ColumnProps>
  route?: string
  onSubmit?: (data: any) => void
}


/* Description: generates a form for a CRUD based on a route and some fields
 * 
 */
function CRUDEditForm({
  route,
  fields,
  values,
  onSubmit,
}: Props) {
  if (!route && !onSubmit) {
    throw new Error('CRUDEditForm requires either a route or an onSubmit method!');
  }

  const fieldData = Array<{field: TableColumnProps, value?: any}>();
  const getInitialData = () => {
    const data = fields.reduce((res, field) => {
      const value = values.find(entry => entry.tableColumn === field.tableColumn);
      fieldData.push({field: field});
      res[field.tableColumn] = value?.value;
      if (value)
        res.method = 'PUT';   // If getting initial data, use PUT

      return res
    }, Object());

    if (!data.method) data.method = 'POST';
    return data;
  };

  const [data, setData] = useState<any>(getInitialData());

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newData = {...data};
    newData[event.target.name] = event.target.value;
    setData(newData);
  }

  const handleSubmit = () => {
    const method = data.method;
    delete data.method;
    // if onSubmit, use that method, otherwise send data to route
    if (onSubmit) return onSubmit(data);
    fetchServer(
      route,
      {
        payload: data,
        method: method,
      }
    )
  }

  return <div className="block">
    {fieldData.map((entry, index) => {
      if (entry.field.customInput)
        return entry.field.customInput;

      if (entry.field.type === 'none')
        return <></>

      return <Input
        key={index}
        name={entry.field.tableColumn}
        value={data[entry.field.tableColumn] || ''}
        onChange={handleFieldChange}
        label={entry.field.name}
        type={entry.field.type}
        {...entry.field.inputProps}
      />;
    })}
    <Button onClick={handleSubmit} isFullWidth>Save</Button>
  </div>
}

export default CRUDEditForm;