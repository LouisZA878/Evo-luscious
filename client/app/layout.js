import localFont from "next/font/local";
import "./globals.css";

import Wrappers from "@/wrappers/Wrapper";
import Navbar from '@/components/Navbar/Navbar'

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export const metadata = {
  title: "Evo-luscious",
  description: "A fashion app in development",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable}`}>
        <Wrappers>
          <Navbar />
          {children}
        </Wrappers>
      </body>
    </html>
  );
}
