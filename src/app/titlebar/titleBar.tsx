"use client";

import { Button } from "@headlessui/react";
import { TauriEvent } from "@tauri-apps/api/event";
import { Window } from "@tauri-apps/api/window";
import clsx from "clsx";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  FaMinus,
  FaRegWindowMaximize,
  FaRegWindowRestore,
  FaXmark,
} from "react-icons/fa6";

import { dashboardLinksMap } from "../data/data";
import { TitleTimeZone } from "./titleTimeZone";

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
      void updateMaximizedStatus();
    });

    const clean = async () => {
      await unlistenResized;
    };

    return () => {
      void clean();
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
      className="flex flex-row min-h-11 justify-between items-center bg-[#2c2c2c] text-white  border-b border-[#585858]"
    >
      <Button
        disabled={isDisableReturnHome}
        onClick={handleReturnHome}
        className={clsx("py-1.5 px-1.5 ", {
          "hover:bg-[#3f3f3f]": !isDisableReturnHome,
        })}
      >
        <Image src="/32x32.png" alt="logo" width={32} height={32} priority />
      </Button>
      <span className="text-center text-sm mx-auto pointer-events-none">
        {title}
      </span>
      <TitleTimeZone />
      <div className="flex gap-1 ">
        <Button
          onClick={() => {
            void handleMinimize();
          }}
          className="px-1 py-1 hover:bg-[#3f3f3f] rounded-full"
        >
          <FaMinus />
        </Button>
        <Button
          onClick={() => {
            void handleMaximize();
          }}
          className="px-1 py-1 hover:bg-[#3f3f3f] rounded-full"
        >
          {isMaximized ? <FaRegWindowRestore /> : <FaRegWindowMaximize />}
        </Button>
        <Button
          onClick={() => {
            void handleClose();
          }}
          className="px-1 py-1 hover:bg-[#3f3f3f] rounded-full"
        >
          <FaXmark />
        </Button>
      </div>
    </div>
  );
}
