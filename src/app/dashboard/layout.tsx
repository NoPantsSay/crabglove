"use client";

import { useEffect, useState } from "react";
import { Browse } from "./nav/browse";
import { OpenDataSources } from "./nav/openDataSources";
import { Setting } from "./nav/setting";

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
          {isClient && <OpenDataSources />}
          <hr className="mx-4 my-2 border-(--borderColor)" />
          {isClient && <Browse />}
          <hr className="mx-4 my-2 border-(--borderColor)" />
          {isClient && <Setting />}
        </ul>
      </div>

      {children}
    </div>
  );
}
