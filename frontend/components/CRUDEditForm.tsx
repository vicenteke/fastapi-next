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
  columns: Array<ColumnProps>
  route?: string
  onSubmit?: (data: any) => void
}


function CRUDEditForm({
  route,
  fields,
  columns,
  onSubmit,
}: Props) {
  if (!route && !onSubmit) {
    throw new Error('CRUDEditForm requires either a route or an onSubmit method!');
  }

  const fieldData = Array<{field: TableColumnProps, column: ColumnProps}>();
  const getInitialData = () => {
    const data = columns.reduce((res, col) => {
      const field = fields.find(entry => entry.tableColumn === col.tableColumn);
      if (field)
        fieldData.push({field: field, column: col});
      if (col.value) {
        res[col.tableColumn] = col.value;
        res.method = 'PUT';   // If getting initial data, use PUT
      }
      return res;
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
        name={entry.column.tableColumn}
        value={data[entry.column.tableColumn] || ''}
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