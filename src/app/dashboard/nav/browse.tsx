"use client";

import { usePathname, useRouter } from "next/navigation";

import { MenuItemButton } from "@/components/menuItemButton";
import { browseLinks } from "../../data/data";

export function Browse() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <li className="px-4 leading-8">
        <span className="text-[#a7a7a7]">浏览</span>
      </li>
      {browseLinks.map((link) => {
        const handleLink = () => {
          router.push(link.href);
        };

        return (
          <li key={link.name}>
            <MenuItemButton
              onClick={handleLink}
              label={link.name}
              Icon={link.icon}
              isActive={pathname === link.href}
            />
          </li>
        );
      })}
    </>
  );
}
