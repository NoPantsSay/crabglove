"use client";

import { FaLink, FaRegFolderOpen } from "react-icons/fa6";

import { MenuItemButton } from "@/components/menuItemButton";

export function OpenDataSources() {
  const handleOpenFile = () => {
    alert("open file");
  };

  const handleOpenConnect = () => {
    alert("open connect");
  };

  return (
    <>
      <li className="px-4 leading-8">
        <span className="text-[#a7a7a7]">加载数据源</span>
      </li>
      <li>
        <MenuItemButton
          onClick={handleOpenFile}
          hotkey="Ctrl+O"
          label="打开本地文件......"
          Icon={FaRegFolderOpen}
        />
      </li>
      <li>
        <MenuItemButton
          onClick={handleOpenConnect}
          hotkey="Ctrl+Shift+O"
          label="打开连接......"
          Icon={FaLink}
        />
      </li>
    </>
  );
}
