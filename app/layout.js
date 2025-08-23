import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import News from "@/components/News";


const inter = Inter({
    variable: "--font-inter",
})

export const metadata = {
  title: "X",
  description: "Clone of X (formerly Twiter)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
      <div className="flex justify-between max-w-6xl mx-auto">
          <div className="hidden sm:inline border-r border-gray-200 h-screen p-3">
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
