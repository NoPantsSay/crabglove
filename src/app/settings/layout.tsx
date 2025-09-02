"use client";

import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { useMeasure } from "react-use";
import { ReturnDashboard } from "./nav/returnDashboard";
import { UserSettings } from "./nav/userSetting";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);
  const [ref, { width }] = useMeasure<HTMLDivElement>();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div
      ref={ref}
      className={clsx(
        "flex max-w-full max-h-full",
        width <= 600
          ? "flex-1 flex-col overflow-y-auto"
          : "flex-auto flex-row overflow-hidden",
      )}
    >
      <div
        className={clsx(
          "block min-w-[280px] bg-(--secondBackground) border-r border-(--borderColor) px-3 pt-5 pb-4 text-xs ",
          width <= 600 ? "overflow-y-hide" : "overflow-y-auto max-h-full",
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
