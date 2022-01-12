// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import '../styles/global.css'
import Header from '../components/Header'
import Menu from '../components/Menu'

import { ThemeProvider } from '@mui/material/styles'

import theme from '../styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth='md'>
        <CssBaseline />
        <Header />
        <Menu />
        <Component {...pageProps} />
        </Container>
    </ThemeProvider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp