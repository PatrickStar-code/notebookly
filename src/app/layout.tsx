import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ToggleButtom from "./components/toggleButtom";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Notebookly",
  description: "Notebookly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <div className="h-12 fixed right-2 top-2">
          <ToggleButtom />
        </div>
      </body>
    </html>
  );
}
