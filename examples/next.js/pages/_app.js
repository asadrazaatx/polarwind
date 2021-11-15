import "@envoy/polarwind/polarwind.css";
import { AppProvider } from "@envoy/polarwind";

export default function MyApp({ Component, pageProps }) {
  return (
    <AppProvider
      ownHost={process.env.NEXT_PUBLIC_OWN_HOST}
      origin={process.env.NEXT_PUBLIC_DASHBOARD_HOST}
    >
      <Component {...pageProps} />
    </AppProvider>
  );
}
