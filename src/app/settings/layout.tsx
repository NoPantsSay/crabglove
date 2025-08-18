"use client";

import { useEffect, useState } from "react";
import { ReturnDashboard } from "./nav/returnDashboard";
import { UserSettings } from "./nav/userSetting";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex-auto flex flex-row flex-wrap overflow-hidden">
      <div className="min-w-[280px] max-h-full bg-(--secondBackground) border-r border-(--borderColor) px-3 pt-5 pb-4  overflow-y-scroll text-xs ">
        <ul>
          {isClient && <ReturnDashboard />}
          {isClient && <UserSettings />}
        </ul>
      </div>

      {children}
    </div>
  );
}
