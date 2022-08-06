import type { AppProps } from "next/app";

import "@sasja-admin/styles/main.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
