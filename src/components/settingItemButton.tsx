"use client";

import { useTheme } from "next-themes";
import { useEffect, useId, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { Tooltip } from "react-tooltip";

interface SettingItemButtonProps {
  onClick?: () => void;
  hotkey?: string;
  label: string;
  isActive?: boolean;
}

export function SettingItemButton({
  onClick = () => {},
  hotkey = "",
  label,
  isActive = false,
}: SettingItemButtonProps) {
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
      <button
        type="button"
        onClick={onClick}
        className={`w-full flex flex-row min-h-8 py-1 pl-6 pr-4 gap-2 items-center ${isActive ? "bg-(--currentColorBackground) hover:bg-(--currentColorHoverBackground)" : "hover:bg-(--dashboardHoverBackground) "}  `}
        data-tooltip-id={tooltipId}
        data-tooltip-content={displayContent}
        data-tooltip-place="right"
        data-tooltip-variant={isDark ? "dark" : "light"}
      >
        {label}
      </button>

      <Tooltip id={tooltipId} />
    </div>
  );
}
