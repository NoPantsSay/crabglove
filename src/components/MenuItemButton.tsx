import { useId } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import type { IconType } from "react-icons";
import { Tooltip } from "react-tooltip";

interface MenuItemButtonProps {
  onClick: () => void;
  hotkey: string;
  label: string;
  Icon: IconType;
  displayHotkey?: string;
}

export function MenuItemButton({
  onClick,
  hotkey,
  label,
  Icon,
  displayHotkey,
}: MenuItemButtonProps) {
  const tooltipId = useId();

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
        className="w-full flex flex-row min-h-8 py-1 px-4 gap-2 items-center hover:bg-[#585858]"
        data-tooltip-id={tooltipId}
        data-tooltip-content={displayHotkey ?? hotkey}
        data-tooltip-place="right"
        data-tooltip-variant="dark"
      >
        <Icon size={20} color="var(--currentColor)" />
        {label}
      </button>

      <Tooltip id={tooltipId} />
    </div>
  );
}
