"use client";

import { useState } from 'react';
import PermissionChecker from '@/components/PermissionChecker';
import Button from '@/components/Button';
import Table from '@/components/Table';
import Icon from '@/components/Icon';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Pagination from '@/components/Pagination';
import CRUD from '@/components/CRUD';


export default function Home() {
  const tableHeader = ['ID', 'Name', 'Points', 'Actions'];
  const tableFooter = ['', 'Total', 280, ''];
  const tableBody = [
    [1, 'Player 1', 10, <Button color='info'><Icon icon={faUser} /></Button>],
    [2, 'Player 2', 20, <Button color='info'><Icon icon={faUser} /></Button>],
    [3, 'Player 3', 30, <Button color='info'><Icon icon={faUser} /></Button>],
    [4, 'Player 4', 40, <Button color='info'><Icon icon={faUser} /></Button>],
    [5, 'Player 5', 50, <Button color='info'><Icon icon={faUser} /></Button>],
    [6, 'Player 6', 60, <Button color='info'><Icon icon={faUser} /></Button>],
    [7, 'Player 7', 70, <Button color='info'><Icon icon={faUser} /></Button>],
  ];

  const [activePage, setActivePage] = useState(0);

  return (
    <>
      <PermissionChecker permissions={['IS_ADMIN']} redirect>
        <h1 className="title">
            Hello Admin!
        </h1>
        <p className="subtitle">
            This is an admin page!
        </p>
        <Button href='/'>
          Home
        </Button>
        {/* <Table
          header={tableHeader}
          footer={tableFooter}
          body={tableBody}
          activeRow={2}
          idColumn={0}
        />
        <Pagination totalPages={10} activePage={activePage} previous next onNavigate={setActivePage}/> */}

        <CRUD
          route='/permissions/table'
          useDropup
          noPagination
          header={[
            {
              name: '#',
              tableColumn: 'pk',
              type: 'integer',
            },
            {
              name: 'Name',
              tableColumn: 'name',
              type: 'string'
            },
            {
              name: 'Description',
              tableColumn: 'description',
              type: 'string'
            },
          ]}
        />
      </PermissionChecker>
    </>
  )
}
