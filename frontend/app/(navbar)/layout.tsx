import Navbar from '@/components/Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (<>
    <Navbar id='main-navbar'/>
    <br />
    <main>
      {children}
    </main>
  </>);
}
