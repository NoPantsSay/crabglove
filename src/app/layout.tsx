"use client";
import "@/styles/globals.css";
import Link from "next/link";
import { DashboardTitleBar } from "./components/DashboardTitleBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-mono antialiased h-screen w-screen flex flex-col">
        <DashboardTitleBar />

        <div className="border-r border-[#585858]" />

        <div className="flex-auto flex flex-row flex-wrap">
          <div className="w-[300px] flex-shrink-0 flex flex-col bg-[#202020] border-r border-[#585858]">
            <Link
              href="/3d"
              className="text-white-600 hover:text-blue-800 active:font-bold"
            >
              3d
            </Link>
          </div>

          <div className="flex-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
