import '@/styles/globals.sass';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import Alert from '@/components/Alert';

export const metadata = {
  title: "Vicenteke's Base",
  description: 'A base to be used on future projects.',
  viewport: "width=device-width, initial-scale=1",
  icon: "/favicon.ico",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className='has-navbar-fixed-top'>
        <Alert
          id='fetch-server-error-modal'
          type='danger'
          title='Oops...'
          cancel='OK'
        >
          An error occurred while trying to fetch your data.
        </Alert>
        <Navbar id='main-navbar'/>
        <br />
        <main className="content">
          <div className="container">
            {children}
          </div>
        </main>
        <Script src='/bulma.js'/>
      </body>
    </html>
  )
}
