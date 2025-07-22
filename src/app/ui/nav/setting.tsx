"use client";

import { FaGear } from "react-icons/fa6";

import { MenuItemButton } from "@/components/MenuItemButton";

export function Setting() {
  const handleSetting = () => {
    alert("Setting");
  };

  return (
    <li>
      <MenuItemButton onClick={handleSetting} label="设置" Icon={FaGear} />
    </li>
  );
}
