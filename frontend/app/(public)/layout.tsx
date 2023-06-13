import Navbar from '@/components/Navbar';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="content">
        <div className="container">
          {children}
        </div>
      </main>
    </>
  )
}
