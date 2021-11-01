import "@envoy/polarwind/polarwind.css";
import { AppProvider } from "@envoy/polarwind";
/** TODO: remove SSRProvider when @envoy/polarwind includes it by default in AppProvider */
import { SSRProvider } from "@react-aria/ssr";

export default function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    </AppProvider>
  );
}
