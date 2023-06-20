"use client";

import { useState, useEffect } from 'react';
import Button from './Button';
import Table from './Table';
import Icon from './Icon';
import Pagination from './Pagination';
import fetchServer from '@/lib/fetch';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { getToken } from '@/lib/token';


interface HeaderProps {
  tableColumn: string
  name: string
  type: 'string' | 'integer' | 'float' | 'select' | 'boolean'
  getData?: (data: any) => any
  permissions?: Array<string>
}


interface Props {
  route: string
  header: Array<HeaderProps>
  useDropup?: boolean
  noPagination?: boolean
}


/* Description: implementation of an image element using best practices.
 *
 * Props (also includes NextImage props):
 * - title: image title, which goes above the image;
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

  const tableHeader = header.reduce((res, column) => {
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
      return header.reduce((res, headItem) => {
        if (tableHeader.includes(headItem.name)) {
          if (headItem.getData)
            res.push(headItem.getData(entry[headItem.tableColumn]))
          else
            res.push(entry[headItem.tableColumn])
        }
        return res
      }, Array());
    });
    setBody(structured);
  }

  const handleSuccess = (response: any) => {
    structureData(response.rows);
    setTotal(response.total);
  }

  const loadData = () => {
    fetchServer(
      route + queryParams,
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
