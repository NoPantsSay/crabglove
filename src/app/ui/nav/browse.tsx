"use client";

import { usePathname } from "next/navigation";

import { browseLinks } from "../data/data";

export function Browse() {
  const pathname = usePathname();
  return (
    <>
      <li className="px-4 leading-8">
        <span className="text-[#a7a7a7]">浏览</span>
      </li>
      {browseLinks.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;
        return (
          <li key={link.name}>
            <a
              href={link.href}
              className={` flex flex-row min-h-8 py-1 px-4 gap-2 items-center ${isActive ? "bg-[var(--currentColorBackground)]" : "hover:bg-[#585858]"} `}
            >
              <LinkIcon size={20} color="var(--currentColor)" />
              <div>{link.name}</div>
            </a>
          </li>
        );
      })}
    </>
  );
}
