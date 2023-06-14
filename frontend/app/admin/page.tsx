import PermissionChecker from '@/components/PermissionChecker';
import Button from '@/components/Button';


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
      </PermissionChecker>
    </>
  )
}
