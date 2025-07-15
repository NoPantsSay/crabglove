"use client";
import Icon from "@/components/icons/icon.png";
import Image from "next/image";

import { Window } from "@tauri-apps/api/window";
import { FaMinus, FaRegWindowRestore, FaXmark } from "react-icons/fa6";

export function DashboardTitleBar() {
  const appWindow = new Window("main");

  const handleMinimize = () => {
    appWindow.minimize().catch((error: unknown) => {
      console.error(error);
    });
  };
  const handleMaximize = () => {
    appWindow.toggleMaximize().catch((error: unknown) => {
      console.error(error);
    });
  };
  const handleClose = () => {
    appWindow.close().catch((error: unknown) => {
      console.error(error);
    });
  };

  return (
    <div
      data-tauri-drag-region
      className="relative flex justify-between items-center bg-[#2c2c2c] text-white p-1 border-b border-[#585858]"
    >
      <div className="flex pointer-events-none">
        <Image src={Icon} alt="" width={24} height={24} />
      </div>
      <div className="absolute left-0 right-0 text-center text-sm pointer-events-none">
        仪表盘
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
