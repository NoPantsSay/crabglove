"use client";

import { ReturnDashboard } from "./nav/returnDashboard";
import { UserSettings } from "./nav/userSetting";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-auto flex flex-row flex-wrap overflow-hidden">
      <div className="min-w-[280px] max-h-full bg-[var(--dashboardBackground)] border-r border-[#585858] px-3 pt-5 pb-4  overflow-y-scroll text-xs ">
        <ul>
          <ReturnDashboard />
          <UserSettings />
        </ul>
      </div>

      <div className="flex-auto overflow-y-auto">{children}</div>
    </div>
  );
}
