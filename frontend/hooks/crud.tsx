"use client";

import { useState, useEffect, useId } from 'react';
import fetchServer from '@/lib/fetch';
import { getToken } from '@/lib/token';
import { InputTypes } from '@/constants/types';
import { Props as InputProps } from "@/components/Input";

import { decodeId } from '@/lib/random';
import { setCRUDFormData } from '@/lib/crud';


export interface TableColumnProps {
  tableColumn: string
  name: string
  type: InputTypes
  getData?: (data_: any) => any
  permissions?: Array<string>
  getOptions?: () => Array<{text: string, value: string}>
  inputProps?: InputProps
  customInput?: React.ReactNode
}


export interface Props {
  route: string
  header: Array<TableColumnProps>
  noPagination?: boolean
}


/* Description: hook that abstracts CRUD behaviour.
 *
 * Props:
 * - route: base URL for a certain entry (e.g. /product);
 * - header: defines the "columns" to be handled;
 * - noPagination?: whether to paginate queries or not;
 */
function useCRUD({
  route,
  header,
  noPagination,
}: Props) {
  const [activePage, setActivePage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState<Array<any>>([]);
  const [body, setBody] = useState<Array<Array<any>>>([]);
  const [token, setToken] = useState(getToken());
  const idHook = useId();
  const id = decodeId(idHook);
  const modalId = `modal-${route.replace('/', '')}-${id}`;
  const formId = `form-${route.replace('/', '')}-${id}`;

  const deleteEntry = (data_: any) => {
    fetchServer(
      `${route}/${data_.pk}`,
      {
        method: 'DELETE',
        onError: () => loadData(),
        onSuccess: () => loadData()
      }
    )
  }

  const editEntry = (data_: any) => {
    setCRUDFormData(formId, data_);
  }

  // Data and handlers
  const tableHeader = header.reduce((res, column) => {
    if (column.permissions) {
      if (column.permissions.every(p => token.scopes.includes(p)))
        res.push(column.name)
    } else res.push(column.name);
    return res
  }, Array());

  let queryParams = noPagination ? '?' : `?page=${activePage}&per_page=${perPage}`;
  const firstItemNumber = activePage * perPage + 1;

  const structureData = (data_: Array<any>) => {
    const structured = data_.map((entry) => {
      const structData = header.reduce((res, headItem) => {
        if (tableHeader.includes(headItem.name)) {
          if (headItem.getData)
            res.push(headItem.getData(entry[headItem.tableColumn]))
          else
            res.push(entry[headItem.tableColumn])
        }
        return res
      }, Array());
      return structData;
    });
    setBody(structured);
  }

  const handleSuccess = (response: any) => {
    setData(response.rows);
    setTotal(response.total);
  }

  const loadData = () => {
    fetchServer(
      route + '/table' + queryParams,
      {
        onSuccess: handleSuccess
      }
    )
  }

  useEffect(() => {
    loadData();
  }, [activePage, perPage, token]);

  useEffect(() => {
    structureData(data);
  }, [data]);

  return {
    id,
    modalId,
    formId,
    token,
    tableHeader,  // Column names with permissions applied
    body,   // Matrix with the data_ (e.g. to be displayed on a table)
    firstItemNumber,
    total,
    perPage,
    setPerPage,
    activePage,
    setActivePage,
    data,   // Literal response from the server
    setData,
    loadData,
    deleteEntry,
    editEntry,
  }
}

export default useCRUD;
