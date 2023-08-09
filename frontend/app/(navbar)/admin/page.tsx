"use client";

import { useState } from 'react';
import PermissionChecker from '@/components/PermissionChecker';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import CRUD from '@/components/CRUD';
import Select from '@/components/Select';
import SelectTest from '@/components/SelectTest';


export default function Home() {
  // const tableHeader = ['ID', 'Name', 'Points', 'Actions'];
  // const tableFooter = ['', 'Total', 280, ''];
  // const tableBody = [
  //   [1, 'Player 1', 10, <Button color='info'><Icon icon={faUser} /></Button>],
  //   [2, 'Player 2', 20, <Button color='info'><Icon icon={faUser} /></Button>],
  //   [3, 'Player 3', 30, <Button color='info'><Icon icon={faUser} /></Button>],
  //   [4, 'Player 4', 40, <Button color='info'><Icon icon={faUser} /></Button>],
  //   [5, 'Player 5', 50, <Button color='info'><Icon icon={faUser} /></Button>],
  //   [6, 'Player 6', 60, <Button color='info'><Icon icon={faUser} /></Button>],
  //   [7, 'Player 7', 70, <Button color='info'><Icon icon={faUser} /></Button>],
  // ];

  // const [activePage, setActivePage] = useState(0);

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
        <br />

        {/* <Select
          multiple
          color='primary'
          inputSize='small'
          label='Hello'
          state='loading'
          helpText='This is a select'
          errorText='YOU BASTARD'
          successText='Love U S2'
          iconLeft={faUser}
        /> */}

        <SelectTest
          options={[
            {label: 'First option', value: 1},
            {label: 'Second option', value: 2},
            {label: 'Third option', value: 3},
            {label: 'Fourth option', value: 4},
            {label: 'Fifth option', value: 5},
            {label: 'Sixth option', value: 6},
          ]}
        />

        <br />
        <CRUD
          route='/permissions'
          useDropup
          header={[
            {
              name: '#',
              tableColumn: 'pk',
              type: 'hidden',
            },
            {
              name: 'Name',
              tableColumn: 'name',
              type: 'text'
            },
            {
              name: 'Description',
              tableColumn: 'description',
              type: 'text'
            },
          ]}
        />
      </PermissionChecker>
    </>
  )
}
