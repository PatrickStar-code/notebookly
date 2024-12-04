import type { Metadata } from "next";
import { Edu_NSW_ACT_Foundation } from "next/font/google";
import "./globals.css";
import ToggleButtom from "./_components/toggleButtom";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Notebookly",
  description: "Notebookly",
};

const edu = Edu_NSW_ACT_Foundation({
  subsets: ["latin"],
  variable: "--font-edu",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={`${edu.variable} antialiased h-screen`}>
        {children}
        <div className="h-12 fixed right-2 lg:right-8 bottom-2">
          <ToggleButtom />
        </div>
      </body>
    </html>
  );
}
