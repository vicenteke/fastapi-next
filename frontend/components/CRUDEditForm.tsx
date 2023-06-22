"use client";

import { useEffect, useState } from "react";

import { TableColumnProps } from "./CRUD";
import Button from "./Button";
import Input from "./Input";
import fetchServer from "@/lib/fetch";

interface Props {
    fields: Array<TableColumnProps>
    columns: Array<{tableColumn: string, value?: any, props?: any}>
    route?: string
    onSubmit?: (data: any) => void
}


function CRUDEditForm({
    route,
    fields,
    columns,
    onSubmit,
}: Props) {
    const getInitialData = () => {
        const data = columns.reduce((res, col) => {
            if (col.value) {
                res[col.tableColumn] = col.value;
                res.method = 'PUT';     // If getting initial data, use PUT
            }
            return res;
        }, Object());

        if (!data.method) data.method = 'POST';
    };

    const [data, setData] = useState<any>(getInitialData());

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
        {columns.map((col, index) => {
            
            return <Input />
        })}
    </div>
}

export default CRUDEditForm;