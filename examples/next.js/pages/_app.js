import "@envoy/polarwind/polarwind.css";
import { AppProvider } from "@envoy/polarwind";

export default function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}
