"use client";

import { Button } from "@headlessui/react";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { useEffect, useId, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import type { IconType } from "react-icons";
import { Tooltip } from "react-tooltip";

interface MenuItemButtonProps {
  onClick?: () => void;
  hotkey?: string;
  label: string;
  Icon?: IconType;
  isActive?: boolean;
}

export function MenuItemButton({
  onClick = () => {},
  hotkey = "",
  label,
  Icon,
  isActive = false,
}: MenuItemButtonProps) {
  const tooltipId = useId();
  const [isDark, setIsDark] = useState(false);
  const { resolvedTheme } = useTheme();
  const displayContent = hotkey;

  useEffect(() => {
    if (resolvedTheme === "dark") {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, [resolvedTheme]);

  useHotkeys(
    hotkey,
    (e) => {
      e.preventDefault();
      onClick();
    },
    { enableOnFormTags: true },
  );

  return (
    <div>
      <Button
        onClick={onClick}
        className={clsx(
          "w-full flex flex-row min-h-8 py-1 px-4 gap-2 items-center cursor-pointer",
          isActive
            ? "bg-(--currentColorBackground) hover:bg-(--currentColorHoverBackground)"
            : "hover:bg-(--secondHoverBackground) ",
        )}
        data-tooltip-id={tooltipId}
        data-tooltip-content={displayContent}
        data-tooltip-place="right"
        data-tooltip-variant={isDark ? "dark" : "light"}
      >
        {Icon && <Icon size={20} color="var(--currentColor)" />}
        {label}
      </Button>

      <Tooltip id={tooltipId} />
    </div>
  );
}
