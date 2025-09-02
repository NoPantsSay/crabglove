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
        "flex max-w-full max-h-full",
        "not-sm:flex-1 not-sm:flex-col not-sm:overflow-y-auto",
        "sm:flex-auto sm:flex-row sm:overflow-hidden",
      )}
    >
      <div
        className={clsx(
          "block min-w-[280px] bg-(--secondBackground) border-r border-(--borderColor) px-3 pt-5 pb-4 text-xs ",
          "not-sm:overflow-y-hide",
          "sm:overflow-y-auto sm:max-h-full",
        )}
      >
        <ul>
          {isClient && <ReturnDashboard />}
          {isClient && <UserSettings />}
        </ul>
      </div>

      <div
        className={clsx(
          "flex flex-col flex-auto overflow-hide bg-(--background)",
        )}
      >
        {children}
      </div>
    </div>
  );
}
