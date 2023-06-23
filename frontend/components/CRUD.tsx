"use client";

import { useState, useEffect } from 'react';
import Button from './Button';
import Table from './Table';
import Icon from './Icon';
import Pagination from './Pagination';
import fetchServer from '@/lib/fetch';
import { faChevronDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getToken } from '@/lib/token';
import { InputTypes } from '@/constants/types';
import { Props as InputProps } from "./Input";


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
    {!noPagination && <><Pagination
      totalPages={Math.ceil(total / perPage)}
      activePage={activePage}
      previous
      next
      onNavigate={setActivePage}
      isRounded
    />
    <div className='level is-mobile'>
      <div className='level-left'></div>
      <div className='level-right'>
        <div className='level-item'>
          <span>
            {firstItemNumber} - {firstItemNumber + body.length - 1} out of {total}
          </span>
        </div>
        <div className='level-item'>
          <div className={dropdownClasses.join(' ')}>
            <div className="dropdown-trigger">
              <Button
                color='normal'
                variant='rounded'
                aria-haspopup="true"
                aria-controls={`crud-perpage-${total}${route}${queryParams}`}
                onClick={() => setPerPageDropdown(!perPageDropdown)}
              >
                <span>{perPage} per page</span>
                <Icon icon={faChevronDown}/>
              </Button>
            </div>
            <div className="dropdown-menu" id={`crud-perpage-${total}${route}${queryParams}`}>
              <div className="dropdown-content px-4 py-4">
                <div className='field has-addons is-rounded'>
                  <div className='control'>
                    <input
                      className='mb-2 is-rounded'
                      type="number"
                      min={1}
                      value={perPageInput}
                      onChange={(e) => setPerPageInput(e.target.value)}
                      required
                    />
                  </div>
                  <div className='control'>
                    <Button color='info' variant='rounded' onClick={handleSetPerPage}>Reload</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></>}
  </div>)
}

export default CRUD;
