"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

export function ReturnDashboard() {
  const router = useRouter();

  return (
    <li>
      <button
        type="button"
        onClick={() => {
          router.push("/dashboard");
        }}
        className="w-full flex flex-row min-h-8 py-1 px-4 mb-2 gap-2 items-center text-[var(--currentColor)] hover:bg-[var(--dashboardHoverBackground)] "
      >
        <FaArrowLeft size={20} color="var(--currentColor)" />
        返回仪表盘
      </button>
    </li>
  );
}
