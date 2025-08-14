"use client";

import { HiLink, HiOutlineFolder } from "react-icons/hi2";

import { useLanguage } from "@/app/data/useLanguage";
import { MenuItemButton } from "@/components/menuItemButton";

export function OpenDataSources() {
  const { language, getTranslator } = useLanguage();
  const translator = getTranslator();

  const handleOpenFile = () => {
    alert("open file");
  };

  const handleOpenConnect = () => {
    alert("open connect");
  };

  return (
    <>
      <li className="px-4 leading-8">
        <span className="text-(--descriptionColor)">
          {translator("dashboard.open_data_sources").toLocaleUpperCase(
            language,
          )}
        </span>
      </li>
      <li>
        <MenuItemButton
          onClick={handleOpenFile}
          hotkey="Ctrl+O"
          label={translator("dashboard.open_local_files")}
          Icon={HiOutlineFolder}
        />
      </li>
      <li>
        <MenuItemButton
          onClick={handleOpenConnect}
          hotkey="Ctrl+Shift+O"
          label={translator("dashboard.open_connection")}
          Icon={HiLink}
        />
      </li>
    </>
  );
}
