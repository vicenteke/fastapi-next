"use client";

import PermissionChecker from '@/components/PermissionChecker';
import Button from '@/components/Button';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import TableCRUD from '@/components/TableCRUD';
import Select from '@/components/Select';


export default function Home() {
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

        <Select
          options={[
            {label: 'First option', value: 1},
            {label: 'Second option', value: 2},
            {label: 'Third option', value: 3},
            {label: 'Fourth option', value: 4},
            {label: 'Fifth option', value: 5},
            {label: 'Sixth option', value: 6},
          ]}
          multiple
          color='primary'
          inputSize='small'
          label='Hello'
          state='loading'
          helpText='This is a select'
          errorText='YOU BASTARD'
          successText='Love U S2'
          iconLeft={faUser}
          enableNewValues
        />

        <TableCRUD
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
