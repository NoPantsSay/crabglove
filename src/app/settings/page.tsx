"use client";

import { useTheme } from "next-themes";
import { BsLaptopFill } from "react-icons/bs";
import { HiMiniMoon, HiMiniSun } from "react-icons/hi2";

import { ColorSchemeButton } from "@/components/colorSchemeButton";

export default function Page() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-auto flex-col p-6">
      <div className="flex flex-col border border-[#585858]">
        <div className="flex flex-col p-4">
          <span className="text-xl">界面样式</span>
        </div>
        <hr className="border-[#585858]" />
        <div className="flex flex-col p-4">
          <span className="text-xs mb-1 py-1 ">配色方案</span>
          <div className="flex flex-row">
            <ColorSchemeButton
              onClick={() => {
                setTheme("dark");
              }}
              label="暗色"
              Icon={HiMiniMoon}
              isActive={theme === "dark"}
            />
            <ColorSchemeButton
              onClick={() => {
                setTheme("light");
              }}
              label="亮色"
              Icon={HiMiniSun}
              isActive={theme === "light"}
            />
            <ColorSchemeButton
              onClick={() => {
                setTheme("system");
              }}
              label="跟随系统"
              Icon={BsLaptopFill}
              isActive={theme === "system"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
