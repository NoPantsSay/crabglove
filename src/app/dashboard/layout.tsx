"use client";

import { clsx } from "clsx";
import { useEffect, useState } from "react";
import { useMeasure } from "react-use";
import { Browse } from "./nav/browse";
import { OpenDataSources } from "./nav/openDataSources";
import { Setting } from "./nav/setting";

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
          {isClient && <OpenDataSources />}
          <hr className="mx-4 my-2 border-(--borderColor)" />
          {isClient && <Browse />}
          <hr className="mx-4 my-2 border-(--borderColor)" />
          {isClient && <Setting />}
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
