"use client";

import { useState, useEffect } from 'react';
import Button from './Button';
import Table from './Table';
import Icon from './Icon';
import Pagination from './Pagination';
import fetchServer from '@/lib/fetch';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';


interface HeaderProps {
  tableColumn: string
  name: string
  type: 'string' | 'integer' | 'float' | 'select' | 'boolean'
  getData?: (data: any) => any
}


interface Props {
  route: string
  header: Array<HeaderProps>
}


/* Description: implementation of an image element using best practices.
 *
 * Props (also includes NextImage props):
 * - title: image title, which goes above the image;
 */
function CRUD({
  route,
  header,
  ...props
}: Props) {
  const tableHeader = header.map((column) => column.name);

  const [activePage, setActivePage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [body, setBody] = useState<Array<Array<any>>>([]);

  let queryParams = `?page=${activePage}&per_page=${perPage}`;
  const firstItemNumber = activePage * perPage + 1;

  const structureData = (data: Array<any>) => {
    const structured = data.map((entry) => {
      return header.map((headItem) => {
        if (headItem.getData)
          return headItem.getData(entry[headItem.tableColumn])
        return entry[headItem.tableColumn]
      });
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
  }, [activePage, perPage])

  return (<div className='block'>
    <Table
        header={tableHeader}
        body={body}
        isHoverable
        isFullwidth
    />
    <Pagination totalPages={Math.ceil(total / perPage)} activePage={activePage} previous next onNavigate={setActivePage}/>
    <div className='level is-mobile'>
      <div className='level-left'></div>
      <div className='level-right'>
        <div className='level-item'>
          <span>
            {firstItemNumber} - {firstItemNumber + body.length - 1} of {total}
          </span>
        </div>
        <div className='level-item'>
          <Button color='link'>
            <span>{perPage} per page</span>
            <Icon icon={faChevronDown}/>
          </Button>
        </div>
      </div>
    </div>
  </div>)
}

export default CRUD;
