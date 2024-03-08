"use client";

import PermissionChecker from '@/components/PermissionChecker';
import TableCRUD from '@/components/TableCRUD';

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
