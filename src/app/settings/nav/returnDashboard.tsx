"use client";

import { Button } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

export function ReturnDashboard() {
  const router = useRouter();

  return (
    <li>
      <Button
        onClick={() => {
          router.push("/dashboard");
        }}
        className="w-full flex flex-row min-h-8 py-1 px-4 mb-2 gap-2 items-center text-(--currentColor) hover:bg-(--secondHoverBackground) "
      >
        <FaArrowLeft size={20} color="var(--currentColor)" />
        返回仪表盘
      </Button>
    </li>
  );
}
