"use client";

import { useRouter } from "next/navigation";

import { useLanguage } from "@/app/data/useLanguage";
import { MenuItemButton } from "@/components/menuItemButton";
import { settingLinks } from "../../data/menuData";

export function Setting() {
  const router = useRouter();

  const { getTranslator } = useLanguage();
  const translator = getTranslator();

  return (
    <>
      {settingLinks.map((link) => {
        const handleLink = () => {
          router.push(link.href);
        };

        return (
          <li key={link.name}>
            <MenuItemButton
              onClick={handleLink}
              label={translator(link.name)}
              Icon={link.icon}
            />
          </li>
        );
      })}
    </>
  );
}
