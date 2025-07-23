"use client";

import { usePathname, useRouter } from "next/navigation";

import { SettingItemButton } from "@/components/settingItemButton";
import { userSettingsLinks } from "../../data/data";

export function UserSettings() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <li className="px-4 leading-7.5">
        <span className="text-[#a7a7a7]">用户设置</span>
      </li>
      {userSettingsLinks.map((link) => {
        const handleLink = () => {
          router.push(link.href);
        };

        return (
          <li key={link.name}>
            <SettingItemButton
              onClick={handleLink}
              label={link.name}
              isActive={pathname === link.href}
            />
          </li>
        );
      })}
    </>
  );
}
