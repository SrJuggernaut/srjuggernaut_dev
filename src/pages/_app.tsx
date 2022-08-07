import { config } from '@fortawesome/fontawesome-svg-core'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import AppContextProvider from '@contexts/app/AppContextProvider'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AppContextProvider>
      <Head>
        <title key="title">SrJuggernaut Dev</title>
        <meta key="og_title" property="og:title" content="SrJuggernaut Dev" />
        <meta key="twitter_title" property="twitter:title" content="SrJuggernaut Dev" />
        <meta key="description" name="description" content="SrJuggernaut Dev" />
        <meta key="og_description" name="og:description" content="Soy un FullStack developer Javascript." />
        <meta key="twitter_description" name="twitter:description" content="Soy un FullStack developer Javascript." />
        <meta key="og_image" name="og:image" content="https://srjuggernaut.dev/og.png" />
        <meta key="twitter_image" name="twitter:image" content="https://srjuggernaut.dev/og.png" />
        <meta key="twitter_card" name="twitter:card" content="summary" />
        <meta key="og_type" name="og:type" content="website" />
      </Head>
      <Component {...pageProps} />
    </AppContextProvider>
  )
}

export default MyApp
