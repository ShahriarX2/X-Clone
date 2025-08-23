import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import News from "@/components/News";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "X",
  description: "Clone of X (formerly Twiter)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <div className="flex justify-between max-w-6xl mx-auto">
          <div>
              <Sidebar />
          </div>
          <div>{children}</div>
          <div>
              <News />
          </div>
      </div>

      </body>
    </html>
  );
}
