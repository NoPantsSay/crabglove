"use client";
import "@/styles/globals.css";

import { Browse } from "./ui/nav/browse";
import { OpenDataSources } from "./ui/nav/openDataSources";
import { Setting } from "./ui/nav/setting";
import { DashboardTitleBar } from "./ui/titlebar/dashboardTitleBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased h-screen w-screen flex flex-col ">
        <DashboardTitleBar />

        <div className="flex-auto flex flex-row flex-wrap min-w-0">
          <div className="min-w-[280px] max-h-full bg-[var(--dashboardBackground)] border-r border-[#585858] px-3 pt-5 pb-4  overflow-y-scroll text-xs ">
            <ul>
              <OpenDataSources />
              <hr className="mx-4 my-2 border-[#585858]" />
              <Browse />
              <hr className="mx-4 my-2 border-[#585858]" />
              <Setting />
            </ul>
          </div>

          <div className="flex-auto overflow-y-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
