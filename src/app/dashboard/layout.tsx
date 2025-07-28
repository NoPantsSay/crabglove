"use client";

import { Browse } from "./nav/browse";
import { OpenDataSources } from "./nav/openDataSources";
import { Setting } from "./nav/setting";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex-auto flex flex-row flex-wrap overflow-hidden">
      <div className="min-w-[280px] max-h-full bg-(--dashboardBackground) border-r border-[#585858] px-3 pt-5 pb-4  overflow-y-scroll text-xs ">
        <ul>
          <OpenDataSources />
          <hr className="mx-4 my-2 border-[#585858]" />
          <Browse />
          <hr className="mx-4 my-2 border-[#585858]" />
          <Setting />
        </ul>
      </div>

      {children}
    </div>
  );
}
