"use client";

import { usePathname, useRouter } from "next/navigation";

import { useLanguage } from "@/app/data/useLanguage";
import { MenuItemButton } from "@/components/menuItemButton";
import { browseLinks } from "../../data/menuData";

export function Browse() {
  const pathname = usePathname();
  const router = useRouter();

  const { language, getTranslator } = useLanguage();
  const translator = getTranslator();

  return (
    <>
      <li className="px-4 leading-8">
        <span className="text-(--descriptionColor)">
          {translator("dashboard.browse").toLocaleUpperCase(language)}
        </span>
      </li>
      {browseLinks.map((link) => {
        const handleLink = () => {
          router.push(link.href);
        };

        return (
          <li key={link.name}>
            <MenuItemButton
              onClick={handleLink}
              label={translator(link.name)}
              Icon={link.icon}
              isActive={pathname === link.href}
            />
          </li>
        );
      })}
    </>
  );
}
