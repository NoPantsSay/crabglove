"use client";

import { Button } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

import { useLanguage } from "@/app/data/useLanguage";

export function ReturnDashboard() {
  const router = useRouter();

  const { getTranslator } = useLanguage();
  const translator = getTranslator();

  return (
    <li>
      <Button
        onClick={() => {
          router.push("/dashboard");
        }}
        className="w-full flex flex-row min-h-8 py-1 px-4 mb-2 gap-2 items-center text-(--currentColor) hover:bg-(--secondHoverBackground) cursor-pointer"
      >
        <FaArrowLeft size={20} color="var(--currentColor)" />
        {translator("setting.back_to_dashboard")}
      </Button>
    </li>
  );
}
