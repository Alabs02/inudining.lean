import { Html, Head, Main, NextScript } from "next/document";

// PLUGINS
import { inter, dmSans, dmSerifText } from "@/plugins";

// LIBRARIES
import { cn, ReactLenis } from "@/lib";
import { RealViewport } from "@/core";
import { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 2,
  userScalable: true,
  interactiveWidget: "resizes-visual",
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: "#eee2d0" },
    { media: '(prefers-color-scheme: dark)', color: "#4f230b" },
  ],
  colorScheme: "dark"
}

export default function Document() {
  return (
    <Html
      lang="en"
      dir="ltr"
      className={cn(
        dmSans.variable,
        dmSerifText.variable,
        inter.variable,
        "scroll-smooth overflow-y-auto overflow-x-hidden"
      )}
    >
      <Head />
      <ReactLenis root>
        <body className="antialiased w-full min-h-screen flex flex-col intems-center bg-background">
          <RealViewport />
          <Main />
          <NextScript />
        </body>
      </ReactLenis>
    </Html>
  );
}
