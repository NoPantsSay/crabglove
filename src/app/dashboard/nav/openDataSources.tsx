"use client";

import { HiLink, HiOutlineFolder } from "react-icons/hi2";

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
        <span className="text-(--descriptionColor)">加载数据源</span>
      </li>
      <li>
        <MenuItemButton
          onClick={handleOpenFile}
          hotkey="Ctrl+O"
          label="打开本地文件......"
          Icon={HiOutlineFolder}
        />
      </li>
      <li>
        <MenuItemButton
          onClick={handleOpenConnect}
          hotkey="Ctrl+Shift+O"
          label="打开连接......"
          Icon={HiLink}
        />
      </li>
    </>
  );
}
