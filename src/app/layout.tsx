import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { Roboto } from "next/font/google";

export const metadata: Metadata = {
  title: "ImgMetric - Image Optimizer",
  description: "Analyze, optimize, and compress your images with ImgMetric",

  icons: {
    icon: [
      {
        url: "/Img-Metric-logo.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/Img-Metric-logo.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/Img-Metric-logo.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/Img-Metric-logo.png",
  },
};
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased  ${roboto.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
