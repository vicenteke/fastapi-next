import '@/styles/globals.sass';
import Script from 'next/script';

export const metadata = {
  title: "Vicenteke's Base",
  description: 'A base to be used on future projects.',
  viewport: "width=device-width, initial-scale=1",
  icon: "/favicon.ico",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        {children}
        <Script src='/bulma.js'/>
      </body>
    </html>
  )
}
