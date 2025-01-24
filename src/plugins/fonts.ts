import { DM_Sans, DM_Serif_Text, Inter } from "next/font/google";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"]
});

const dmSerifText = DM_Serif_Text({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400"]
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"]
});

export {
  inter,
  dmSans,
  dmSerifText
};