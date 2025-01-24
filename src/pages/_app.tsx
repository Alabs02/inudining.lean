// STYLES
import "@/styles/globals.scss";
import "lenis/dist/lenis.css";

// TYPES
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
