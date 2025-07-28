"use client";

import { TauriEvent } from "@tauri-apps/api/event";
import { Window } from "@tauri-apps/api/window";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  FaMinus,
  FaRegWindowMaximize,
  FaRegWindowRestore,
  FaXmark,
} from "react-icons/fa6";

import { useEffect, useMemo, useState } from "react";
import { dashboardLinksMap } from "../data/data";

export function TitleBar() {
  const pathname = usePathname();
  const router = useRouter();
  const isDisableReturnHome = pathname === "/dashboard";
  const title = dashboardLinksMap.get(pathname)?.title;

  const appWindow = useMemo(() => new Window("main"), []);
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    const updateMaximizedStatus = async () => {
      setIsMaximized(await appWindow.isMaximized());
    };

    const unlistenResized = appWindow.listen(TauriEvent.WINDOW_RESIZED, () => {
      updateMaximizedStatus();
    });

    const clean = async () => {
      await unlistenResized;
    };

    return () => {
      clean();
    };
  }, [appWindow]);

  const handleReturnHome = () => {
    router.push("/dashboard");
  };

  const handleMinimize = async () => {
    await appWindow.minimize();
  };
  const handleMaximize = async () => {
    await appWindow.toggleMaximize();
  };
  const handleClose = async () => {
    await appWindow.close();
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
          {isMaximized ? <FaRegWindowRestore /> : <FaRegWindowMaximize />}
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
