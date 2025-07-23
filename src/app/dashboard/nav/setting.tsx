"use client";

import { useRouter } from "next/navigation";

import { MenuItemButton } from "@/components/menuItemButton";
import { settingLinks } from "../../data/data";

export function Setting() {
  const router = useRouter();

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
              label={link.name}
              Icon={link.icon}
            />
          </li>
        );
      })}
    </>
  );
}
