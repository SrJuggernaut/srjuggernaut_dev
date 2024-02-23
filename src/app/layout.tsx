import Consumer from '@/app/_components/Consumer'
import Provider from '@/app/_components/Provider'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import '@fontsource/roboto/latin-300.css'
import '@fontsource/roboto/latin-400.css'
import '@fontsource/roboto/latin-700.css'
import '@fontsource/source-code-pro/latin-400.css'
import '@fontsource/source-code-pro/latin-900.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Container } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { Metadata } from 'next'
import { FC, ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'SrJuggernaut Dev',
  description: 'Soy un FullStack developer Javascript.'
}
config.autoAddCss = false

interface RootLayoutProps {
  children: ReactNode
}

const RootLayout:FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="es">
      <AppRouterCacheProvider>
        <body>
          <Provider>
            <Header />
            <Container
              component="main"
              fixed
              sx={{
                minHeight: 'calc(100vh - 120px)',
                marginTop: '60px',
                padding: 1
              }}
            >
              {children}
            </Container>
            <Footer />
            <Consumer />
          </Provider>
        </body>
      </AppRouterCacheProvider>
    </html>
  )
}

export default RootLayout
