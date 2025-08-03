"use client";

import { Button } from "@headlessui/react";
import clsx from "clsx";
import type { IconType } from "react-icons";

interface ColorSchemeButtonProps {
  onClick?: () => void;
  label: string;
  Icon?: IconType;
  isActive?: boolean;
}

export function ColorSchemeButton({
  onClick = () => {},
  label,
  Icon,
  isActive = false,
}: ColorSchemeButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={clsx(
        "flex flex-row min-h-8 py-1 px-4 gap-2 border border-[#585858]  items-center text-xs",
        isActive
          ? "text-(--currentColor) bg-(--currentColorBackground) hover:bg-(--currentColorHoverBackground)"
          : "hover:bg-(--secondHoverBackground)",
      )}
    >
      {Icon && <Icon size={20} />}
      {label}
    </Button>
  );
}
