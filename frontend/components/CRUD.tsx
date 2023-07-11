"use client";

import { useState, useEffect } from 'react';
import Button from './Button';
import Table from './Table';
import Icon from './Icon';
import CRUDPagination from './CRUDPagination';
import fetchServer from '@/lib/fetch';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { getToken } from '@/lib/token';
import { InputTypes } from '@/constants/types';
import { Props as InputProps } from "./Input";

import { generateId } from '@/lib/random';


export interface TableColumnProps {
  tableColumn: string
  name: string
  type: InputTypes
  getData?: (data: any) => any
  permissions?: Array<string>
  getOptions?: () => Array<{text: string, value: string}> // TODO: implement Select input
  inputProps?: InputProps
  customInput?: React.ReactNode
}


interface Props {
  route: string
  header: Array<TableColumnProps>
  useDropup?: boolean
  noPagination?: boolean
}


/* Description: 
 *
 * Props:
 * - tableColumn: ;
 */
function CRUD({
  route,
  header,
  useDropup,
  noPagination
}: Props) {
  const [activePage, setActivePage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [perPageInput, setPerPageInput] = useState('10');
  const [perPageDropdown, setPerPageDropdown] = useState(false);
  const [total, setTotal] = useState(0);
  const [body, setBody] = useState<Array<Array<any>>>([]);
  const [token, setToken] = useState(getToken());

  const dropdownClasses = ['dropdown', 'is-right'];
  if (useDropup) dropdownClasses.push('is-up');
  if (perPageDropdown) dropdownClasses.push('is-active');

  // Include actions column
  const getActions = (data: any) => {
    return (<>
      <Button
        color='danger'
        onClick={() => {
          fetchServer(
            `${route}/${data.pk}`,
            {
              method: 'DELETE',
              onError: () => loadData(),
              onSuccess: () => loadData()
            }
          )
        }}
      >
        <Icon icon={faTrash}/>
      </Button>
    </>)
  }

  const headerWithActions = Array<TableColumnProps>(...header, {
    tableColumn: 'none',
    name: 'Actions',
    type: 'none',
    getData: getActions,
  });

  // Data and handlers
  const tableHeader = headerWithActions.reduce((res, column) => {
    if (column.permissions) {
      if (column.permissions.every(p => token.scopes.includes(p)))
        res.push(column.name)
    } else res.push(column.name);
    return res
  }, Array());

  let queryParams = noPagination ? '?' : `?page=${activePage}&per_page=${perPage}`;
  const firstItemNumber = activePage * perPage + 1;

  const handleSetPerPage = () => {
    const value = parseInt(perPageInput);
    setPerPageDropdown(false);
    if (isNaN(value)) {
      setPerPageInput(String(perPage));
    } else if (value !== perPage) {
      setActivePage(Math.floor((firstItemNumber - 1) / value));
      setPerPage(value);
    }
  }

  const structureData = (data: Array<any>) => {
    const structured = data.map((entry) => {
      const structData = header.reduce((res, headItem) => {
        if (tableHeader.includes(headItem.name)) {
          if (headItem.getData)
            res.push(headItem.getData(entry[headItem.tableColumn]))
          else
            res.push(entry[headItem.tableColumn])
        }
        return res
      }, Array());
      structData.push(getActions(entry));
      return structData;
    });
    setBody(structured);
  }

  const handleSuccess = (response: any) => {
    structureData(response.rows);
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
  }, [activePage, perPage, token])

  return (<div className='block'>
    <Table
        header={tableHeader}
        body={body}
        isHoverable
        isFullwidth
    />
    {!noPagination && <CRUDPagination
      id={route + generateId()}
      perPage={perPage}
      firstItemNumber={firstItemNumber}
      lastItemNumber={firstItemNumber + body.length - 1}
      total={total}
      activePage={activePage}
      setActivePage={setActivePage}
      setPerPage={setPerPage}
      useDropup
    />}
  </div>)
}

export default CRUD;
