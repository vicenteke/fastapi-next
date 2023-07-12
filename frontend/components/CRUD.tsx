"use client";

import { useState, useEffect } from 'react';
import Button from './Button';
import Table from './Table';
import Icon from './Icon';
import CRUDPagination from './CRUDPagination';
import CRUDEditForm from './CRUDEditForm';
import fetchServer from '@/lib/fetch';
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getToken } from '@/lib/token';
import { InputTypes } from '@/constants/types';
import { Props as InputProps } from "./Input";
import Modal from './Modal';
import ModalButton from './ModalButton';

import { generateId } from '@/lib/random';
import { setCRUDFormData } from '@/lib/crud';


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
  const [total, setTotal] = useState(0);
  const [body, setBody] = useState<Array<Array<any>>>([]);
  const [token, setToken] = useState(getToken());
  const values = [{   // TODO: get values
    tableColumn: 'name',
    value: 'John Kane'
  },
  {
    tableColumn: 'description',
    value: 'Just another test :)',
  }]
  const [id, ] = useState(generateId());
  const modalId = `modal-${route.replace('/', '')}-${id}`;
  const formId = `form-${route.replace('/', '')}-${id}`;

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
      <ModalButton
        color='warning'
        target={modalId}
        onClick={() => {
          setCRUDFormData(formId, data);
        }}
      >
        <Icon icon={faPencil}/>
      </ModalButton>
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
    <Modal id={modalId}>
      <CRUDEditForm   // TODO: remove values parameter and use setCRUDFormData
        fields={header}
        values={values}
        route={route}
        id={formId}
      />
    </Modal>
    <ModalButton target={modalId} className='mb-1'><Icon icon={faPlus} /></ModalButton>
    <Table
        header={tableHeader}
        body={body}
        isHoverable
        isFullwidth
    />
    {!noPagination && <CRUDPagination
      id={route + id}
      perPage={perPage}
      firstItemNumber={firstItemNumber}
      lastItemNumber={firstItemNumber + body.length - 1}
      total={total}
      activePage={activePage}
      setActivePage={setActivePage}
      setPerPage={setPerPage}
      useDropup={useDropup}
    />}
  </div>)
}

export default CRUD;
