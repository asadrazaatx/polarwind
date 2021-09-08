import { AppProvider } from '@envoy/polarwind'
import '@envoy/polarwind/polarwind.css'

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp
