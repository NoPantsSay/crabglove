"use client";

import { getCurrentWindow } from "@tauri-apps/api/window";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FaMinus, FaRegWindowRestore, FaXmark } from "react-icons/fa6";

import { dashboardLinksMap } from "../data/data";

export function TitleBar() {
  const pathname = usePathname();
  const router = useRouter();
  const isDisableReturnHome = pathname === "/dashboard";
  const title = dashboardLinksMap.get(pathname)?.title;

  const handleReturnHome = () => {
    router.push("/dashboard");
  };

  const handleMinimize = () => {
    getCurrentWindow()
      .minimize()
      .catch((error: unknown) => {
        console.error(error);
      });
  };
  const handleMaximize = () => {
    getCurrentWindow()
      .toggleMaximize()
      .catch((error: unknown) => {
        console.error(error);
      });
  };
  const handleClose = () => {
    getCurrentWindow()
      .close()
      .catch((error: unknown) => {
        console.error(error);
      });
  };

  return (
    <div
      data-tauri-drag-region
      className="relative flex flex-row min-h-11 justify-between items-center bg-[#2c2c2c] text-white  border-b border-[#585858]"
    >
      <button
        type="button"
        disabled={isDisableReturnHome}
        onClick={handleReturnHome}
        className={`px-1.5 py-1 ${isDisableReturnHome ? "" : "hover:bg-[#3f3f3f]"}`}
      >
        <Image src="/32x32.png" alt="logo" width={32} height={32} priority />
      </button>
      <div className="absolute left-0 right-0 text-center text-sm pointer-events-none">
        {title}
      </div>
      <div className="flex space-x-1 ml-auto">
        <button
          type="button"
          onClick={handleMinimize}
          className="px-1 py-1 hover:bg-[#3f3f3f] rounded-full"
        >
          <FaMinus />
        </button>
        <button
          type="button"
          onClick={handleMaximize}
          className="px-1 py-1 hover:bg-[#3f3f3f] rounded-full"
        >
          <FaRegWindowRestore />
        </button>
        <button
          type="button"
          onClick={handleClose}
          className="px-1 py-1 hover:bg-[#3f3f3f] rounded-full"
        >
          <FaXmark />
        </button>
      </div>
    </div>
  );
}
