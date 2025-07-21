"use client";

import { FaGear } from "react-icons/fa6";

export function Setting() {
  return (
    <>
      <li className="flex flex-row min-h-8 py-1 px-4 gap-2 items-center hover:bg-[#585858]">
        <FaGear size={20} color="var(--currentColor)" />
        <div>设置</div>
      </li>
    </>
  );
}
