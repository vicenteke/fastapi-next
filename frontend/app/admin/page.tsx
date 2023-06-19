import PermissionChecker from '@/components/PermissionChecker';
import Button from '@/components/Button';
import Table from '@/components/Table';
import Icon from '@/components/Icon';
import { faUser } from '@fortawesome/free-solid-svg-icons';


export default function Home() {
  const tableHeader = ['ID', 'Name', 'Points', 'Actions'];
  const tableFooter = ['ID', 'Name', 'Points', 'Actions'];
  const tableBody = [
    [1, 'Player 1', 10, <Button><Icon icon={faUser} /></Button>],
    [2, 'Player 2', 20, <Button><Icon icon={faUser} /></Button>],
    [3, 'Player 3', 30, <Button><Icon icon={faUser} /></Button>],
    [4, 'Player 4', 40, null],
    [5, 'Player 5', 50, <Button><Icon icon={faUser} /></Button>],
    [6, 'Player 6', 60, <Button><Icon icon={faUser} /></Button>],
    [7, 'Player 7', 70, <Button><Icon icon={faUser} /></Button>],
  ];


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
        <Table
          header={tableHeader}
          footer={tableFooter}
          body={tableBody}
          activeRow={2}
          idColumn={0}
          isFullwidth={false}
        />
      </PermissionChecker>
    </>
  )
}
