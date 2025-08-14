"use client";

import { usePathname, useRouter } from "next/navigation";

import { useLanguage } from "@/app/data/useLanguage";
import { SettingItemButton } from "@/components/settingItemButton";
import { userSettingsLinks } from "../../data/menuData";

export function UserSettings() {
  const pathname = usePathname();
  const router = useRouter();

  const { language, getTranslator } = useLanguage();
  const translator = getTranslator();

  return (
    <>
      <li className="px-4 leading-7.5">
        <span className="text-(--descriptionColor)">
          {translator("setting.user_settings").toLocaleUpperCase(language)}
        </span>
      </li>
      {userSettingsLinks.map((link) => {
        const handleLink = () => {
          router.push(link.href);
        };

        return (
          <li key={link.name}>
            <SettingItemButton
              onClick={handleLink}
              label={translator(link.name)}
              isActive={pathname === link.href}
            />
          </li>
        );
      })}
    </>
  );
}
