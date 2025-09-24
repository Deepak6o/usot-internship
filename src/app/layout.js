import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "IGNITE Internship Challenge | upGrad School of Technology",
  description: "",
  icons: {
    icon: '/assets/faviconL.svg',
    shortcut: '/assets/faviconL.svg',
    apple: '/assets/faviconL.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* SVG faviconL with fallback */}
        <link rel="icon" type="image/svg+xml" href="/assets/faviconL.svg" />
        <link rel="icon" type="image/x-icon" href="/assets/faviconL.svg" />
        <link rel="apple-touch-icon" href="/assets/faviconL.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}