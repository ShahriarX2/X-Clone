"use client";

import { usePathname } from "next/navigation";
import SidebarWrapper from "@/components/SidebarWrapper";
import News from "@/components/News";
import { AuthProvider } from "@/app/context/AuthContext";

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const showSidebarAndNews = pathname !== "/signin" && pathname !== "/signup";

  return (
    <AuthProvider>
      <div className="flex justify-between max-w-6xl mx-auto">
        {showSidebarAndNews && (
          <div className="hidden sm:inline border-r border-gray-200 p-3 sticky top-0">
            <SidebarWrapper />
          </div>
        )}
        <div className="flex-1">{children}</div>
        {showSidebarAndNews && (
          <div className="lg:flex-col p-3 border-l border-gray-100 hidden lg:flex w-96">
            <div className="sticky top-0 bg-white py-2">
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-100 border border-gray-200 rounded-3xl text-sm w-full px-4 py-2"
              />
            </div>
            <News />
          </div>
        )}
      </div>
    </AuthProvider>
  );
}
