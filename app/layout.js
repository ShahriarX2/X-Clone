import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "./MainLayout";

const inter = Inter({
    variable: "--font-inter",
})

export const metadata = {
  title: "X",
  description: "Clone of X (formerly Twiter)",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en" className="h-full">
      <body
          className={`${inter.variable} antialiased overflow-y-auto h-full`}
      >
        <MainLayout>{children}</MainLayout>
      </body>
      </html>
  );
}
