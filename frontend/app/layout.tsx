import '@/styles/globals.scss';
import Script from 'next/script';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import theme from '../theme';

export const metadata = {
  title: "Vicenteke's Base",
  description: 'A base to be used on future projects.',
  viewport: "width=device-width, initial-scale=1",
  icon: "/favicon.ico",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // TODO: include root modals
  return (
    <html lang="pt-br">
      <body className='has-navbar-fixed-top'>
        {/* <Alert
          id='fetch-server-error-modal'
          type='danger'
          title='Oops...'
          cancel='OK'
        >
          An error occurred while trying to fetch your data.
        </Alert> */}
        <AppRouterCacheProvider>
          <CssVarsProvider theme={theme}>
            {children}
          </CssVarsProvider>
        </AppRouterCacheProvider>
        {/* <Script src='/bulma.js'/> */}
      </body>
    </html>
  )
}
