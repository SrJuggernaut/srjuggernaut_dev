import AppContextProvider from '@contexts/app/AppContextProvider'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import type { AppProps } from 'next/app'

config.autoAddCss = false

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  )
}

export default MyApp
