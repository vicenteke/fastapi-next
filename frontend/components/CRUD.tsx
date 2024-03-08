"use client";
// TODO: implement this as a base class for "CRUDing". Adapt TableCRUD accordingly

import { useState, useEffect } from 'react';
import Table from './Table';
import CRUDPagination from './CRUDPagination';
import CRUDForm from './CRUDForm';

import useCRUD, { Props as CRUDProps, TableColumnProps } from '@/hooks/crud';
import { clearCRUDFormData } from '@/lib/crud';


interface Props extends CRUDProps {
  useDropup?: boolean
}


/* Description: implements CRUD functionality as a table.
 * 
 * Props:
 * - route: base route for the CRUD;
 * - header: the columns to be included;
 * - useDropup?: whether the pagination selector should use a dropup or not;
 * - noPagination?: whether to use pagination or not;
 */
function TableCRUD({
  route,
  header,
  useDropup,
  noPagination
}: Props) {
  // TODO
  const [tableBody, setTableBody] = useState<Array<Array<React.ReactNode | string | null>>>([]);

  const {
    id,
    modalId,
    formId,
    token,
    body,
    firstItemNumber,
    total,
    perPage,
    setPerPage,
    activePage,
    setActivePage,
    data,
    loadData,
    deleteEntry,
    editEntry,
  } = useCRUD({
    route,
    header,
    noPagination,
  });

  const getActions = (data_: any) => {
    if (!data_) return <></>;

    data_.method = 'PUT';
    return (<>
      {/* <Button
        color='danger'
        onClick={() => {
          deleteEntry(data_);
        }}
      >
        <Icon icon={faTrash}/>
      </Button>
      <ModalButton
        color='warning'
        target={modalId}
        onClick={() => {
          editEntry(data_);
        }}
      >
        <Icon icon={faPencil}/>
      </ModalButton> */}
    </>)
  }

  const extraColumns = [{
    tableColumn: 'none',
    name: 'Actions',
    type: 'none' as 'none',
    getData: getActions,
  }] as TableColumnProps[];

  // Table CRUD logic for extra columns
  const extraColumnsPermissions = extraColumns.filter((column) => {
    if (column.permissions && !column.permissions.every(p => token.scopes.includes(p)))
        return false
    return true
  }, Array());
  const headerWithExtraColumns = Array<TableColumnProps>(...header, ...extraColumnsPermissions);
  const tableHeaderWithExtraColumns = headerWithExtraColumns.map((col) => col.name)

  function includeExtraColumns(body: Array<Array<React.ReactNode | string | null>>){
    const newBody = body.map((line, index) => {
      if (!data || !data[index])
        line.push(Array(extraColumns.length).fill(''))
      else {
        for (const column of extraColumns) {
          if (column.getData)
            line.push(column.getData(data[index]))
          else
            line.push(data[index][column.tableColumn])
        }
      }
      return line;
    })
    return newBody;
  }

  function buildTableBody(body: Array<Array<React.ReactNode | string | null>>) {
    const newTableBody = includeExtraColumns(body);
    setTableBody(newTableBody);
  }
  
  useEffect(() => {
    buildTableBody(body);
  }, [body]);

  return (<>
    {/* <Modal id={modalId}> */}
      <CRUDForm
        fields={header}
        route={route}
        id={formId}
        modalId={modalId}
        afterSubmit={() => loadData()}
      />
    {/* </Modal> */}
    {/* <ModalButton target={modalId} className='mb-1' onClick={() => clearCRUDFormData(formId)}>
      <Icon icon={faPlus} />
    </ModalButton> */}
    <Table
        header={tableHeaderWithExtraColumns}
        body={tableBody}
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
  </>)
}

export default TableCRUD;
