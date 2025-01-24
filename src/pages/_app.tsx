// STYLES
import "@/styles/globals.scss";
import "lenis/dist/lenis.css";

import "@fontsource/dm-sans/200.css";
import "@fontsource/dm-sans/300.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/dm-sans/300-italic.css";
import "@fontsource/dm-sans/400-italic.css";
import "@fontsource/dm-sans/500-italic.css";

import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/300-italic.css";
import "@fontsource/inter/400-italic.css";
import "@fontsource/inter/500-italic.css";

import "@fontsource/dm-serif-text/400.css";
import "@fontsource/dm-serif-text/400-italic.css";

// TYPES
import type { AppProps } from "next/app";
import NProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} className="bg-purple-500" />
      <NProgress
        height={2}
        stopDelayMs={200}
        startPosition={0.3}
        showOnShallow={true}
        color="linear-gradient(90deg, hsl(38 95% 54%) 0%, hsl(343 82% 57%) 50%, hsl(38 95% 54%) 100%)"
      />
    </>
  );
}
