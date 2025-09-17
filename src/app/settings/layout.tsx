"use client";

import { clsx } from "clsx";
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
    <div
      className={clsx(
        "grid",
        "not-sm:grid-rows-[auto_auto] not-sm:grid-cols-1 not-sm:overflow-y-auto",
        "sm:grid-cols-[auto_1fr] sm:grid-rows-1 sm:overflow-hidden",
      )}
    >
      <div
        className={clsx(
          "block min-w-[280px] bg-(--secondBackground) border-r border-(--borderColor) px-3 pt-5 pb-4 text-xs ",
          "not-sm:overflow-y-hide",
          "sm:overflow-y-auto",
        )}
      >
        <ul>
          {isClient && <ReturnDashboard />}
          {isClient && <UserSettings />}
        </ul>
      </div>

      {children}
    </div>
  );
}
