import '@/styles/globals.sass'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import script from '@/../../lib/bulma'


export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Component {...pageProps} />
    <Script src={script}/>
  </>
}
