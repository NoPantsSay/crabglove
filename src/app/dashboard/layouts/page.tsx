"use client";

import {
  Button,
  Field,
  Input,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { clsx } from "clsx";
import { formatDistance } from "date-fns";
import { useTheme } from "next-themes";
import { useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  HiArrowDown,
  HiArrowUp,
  HiChevronDown,
  HiChevronUp,
  HiEllipsisVertical,
} from "react-icons/hi2";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdIndeterminateCheckBox,
} from "react-icons/md";
import { PiDownload } from "react-icons/pi";
import { RiLayoutMasonryLine } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import {
  layoutTypes,
  layoutUpdateFilters,
  useLayouts,
} from "@/app/data/useLayouts";
import { useTimeZoneStore } from "@/app/data/useTimeZoneStore";

export default function Page() {
  const date = useMemo(() => new Date(), []);

  const { resolvedTheme } = useTheme();
  const { getDateFormat } = useTimeZoneStore();

  const { getLayoutTypeDisplay, getlayoutUpdateFilterDisplay, layouts } =
    useLayouts();
  const [inputValue, setInputValue] = useState("");
  const [layoutType, setLayoutType] = useState(layoutTypes[0].name);
  const [layoutUpdateFilter, setLayoutUpdateFilter] = useState(
    layoutUpdateFilters[0].name,
  );
  const [layoutsSortUp, setLayoutsSortUp] = useState(false);
  const [lastUpdatedSortUp, setLastUpdatedSortUp] = useState(false);
  const [lastOpenedSortUp, setLastOpenedSortUp] = useState(false);

  const LayoutsSortIconComponent = layoutsSortUp ? HiArrowUp : HiArrowDown;
  const LastUpdatedSortIconComponent = lastUpdatedSortUp
    ? HiArrowUp
    : HiArrowDown;
  const LastOpenedSortIconComponent = lastOpenedSortUp
    ? HiArrowUp
    : HiArrowDown;

  const filteredLayouts = useMemo(() => {
    return Array.from(layouts.entries());
  }, [layouts]);

  const [layoutsCheckedSet, setLayoutsCheckedSet] = useState(new Set<string>());

  const itemToggle = (uuid: string) => {
    const checked = layoutsCheckedSet.has(uuid);

    const newSet = new Set(layoutsCheckedSet);
    if (!checked) {
      newSet.add(uuid);
    } else {
      newSet.delete(uuid);
    }
    setLayoutsCheckedSet(newSet);
  };

  const itemAllToggle = () => {
    const checked = layoutsCheckedSet.size !== 0;

    if (!checked) {
      const newSet = new Set<string>();
      filteredLayouts.forEach(([key, _value]) => {
        newSet.add(key);
      });
      setLayoutsCheckedSet(newSet);
    } else {
      setLayoutsCheckedSet(new Set<string>());
    }
  };

  const SelectAllIconComponent =
    layoutsCheckedSet.size === 0
      ? MdCheckBoxOutlineBlank
      : layoutsCheckedSet.size === filteredLayouts.length
        ? MdCheckBox
        : MdIndeterminateCheckBox;

  return (
    <div className="grid grid-rows-1 grid-cols-1 p-6">
      <div className="grid grid-rows-[auto_auto_1fr] border border-(--borderColor)">
        {
          // 标题栏
        }
        <div className="flex flex-row justify-between items-center p-3 border-b border-b-(--borderColor)">
          <span className="text-base">Layout</span>
          <Menu>
            <MenuButton className="flex flex-row items-center px-2.25 py-0.75 border focus:not-data-focus:outline-none cursor-pointer">
              <FaPlus size={16} />
              <span className="pl-2 text-xs">Add</span>
            </MenuButton>

            <MenuItems
              anchor={{ to: "bottom end", gap: "-24px" }}
              className="flex flex-col py-1 bg-(--secondBackground) shadow-lg outline-none"
            >
              <MenuItem>
                <Button className="flex flex-row py-1 px-3 items-center data-focus:bg-(--secondHoverBackground)">
                  <RiLayoutMasonryLine size={20} />
                  <span className="pl-3 text-sm">New layout</span>
                </Button>
              </MenuItem>
              <MenuItem>
                <Button className="flex flex-row py-1 px-3 items-center data-focus:bg-(--secondHoverBackground)">
                  <PiDownload size={20} />
                  <span className="pl-3 text-sm">Import layout</span>
                </Button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
        {
          // 过滤栏
        }
        <div
          className={clsx(
            "grid grid-cols-[minmax(100px,_1fr)_minmax(100px,_1fr)_minmax(100px,_1fr)] gap-3 justify-between items-center p-3 overflow-x-auto",
          )}
        >
          {
            // 名字
          }
          <Field className="flex flex-col ">
            <Label className="py-1 text-sm text-(--descriptionColor)">
              Search
            </Label>
            <Input
              value={inputValue}
              onChange={(event) => {
                setInputValue(event.target.value);
              }}
              placeholder="Layout name"
              className={clsx(
                "py-2 px-2.5 text-sm border border-(--borderColor) hover:border-(--foreground) focus:border-(--currentColor) outline-none",
              )}
            />
          </Field>
          {
            // 类型
          }
          <Field className="flex flex-col">
            <Label className="py-1 text-sm text-(--descriptionColor) ">
              Type
            </Label>
            <Listbox value={layoutType} onChange={setLayoutType}>
              <ListboxButton
                className={clsx(
                  "relative py-2 px-2.5 text-sm text-(--descriptionColor) border border-(--borderColor) hover:border-(--foreground) focus:border-(--currentColor) data-open:border-(--currentColor) rounded-none outline-none text-left cursor-pointer",
                )}
              >
                {({ open }) => {
                  const IconComponent = open ? HiChevronUp : HiChevronDown;
                  return (
                    <>
                      {getLayoutTypeDisplay(layoutType)}
                      <IconComponent
                        className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-(--foreground)"
                        aria-hidden="true"
                      />
                    </>
                  );
                }}
              </ListboxButton>
              <ListboxOptions
                anchor="bottom"
                className={clsx(
                  "w-(--button-width) py-2 bg-(--secondBackground) outline-none",
                )}
              >
                {layoutTypes.map((data) => (
                  <ListboxOption
                    key={data.name}
                    value={data.name}
                    className={clsx(
                      "py-1.5 px-4 cursor-pointer hover:bg-(--secondHoverBackground) data-focus:bg-(--secondHoverBackground) data-selected:bg-(--currentColorBackground) data-selected:hover:bg-(--currentColorHoverBackground) data-selected:data-focus:bg-(--currentColorHoverBackground)",
                    )}
                  >
                    <Label className="text-sm pointer-events-none">
                      {data.display}
                    </Label>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Listbox>
          </Field>
          {
            // 过滤更新时间
          }
          <Field className="flex flex-col">
            <Label className="py-1 text-sm text-(--descriptionColor) ">
              Lasted update
            </Label>
            <Listbox
              value={layoutUpdateFilter}
              onChange={setLayoutUpdateFilter}
            >
              <ListboxButton
                className={clsx(
                  "relative py-2 px-2.5 text-sm text-(--descriptionColor) border border-(--borderColor) hover:border-(--foreground) focus:border-(--currentColor) data-open:border-(--currentColor) rounded-none outline-none text-left cursor-pointer",
                )}
              >
                {({ open }) => {
                  const IconComponent = open ? HiChevronUp : HiChevronDown;
                  return (
                    <>
                      {getlayoutUpdateFilterDisplay(layoutUpdateFilter)}
                      <IconComponent
                        className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-(--foreground)"
                        aria-hidden="true"
                      />
                    </>
                  );
                }}
              </ListboxButton>
              <ListboxOptions
                anchor="bottom"
                className={clsx(
                  "w-(--button-width) py-2 bg-(--secondBackground) outline-none",
                )}
              >
                {layoutUpdateFilters.map((data) => (
                  <ListboxOption
                    key={data.name}
                    value={data.name}
                    className={clsx(
                      "py-1.5 px-4 cursor-pointer hover:bg-(--secondHoverBackground) data-focus:bg-(--secondHoverBackground) data-selected:bg-(--currentColorBackground) data-selected:hover:bg-(--currentColorHoverBackground) data-selected:data-focus:bg-(--currentColorHoverBackground)",
                    )}
                  >
                    <Label className="text-sm pointer-events-none">
                      {data.display}
                    </Label>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Listbox>
          </Field>
        </div>
        <div className="relative flex flex-col mt-2 border-t border-t-(--borderColor) overflow-auto">
          <div
            className={clsx(
              "grid grid-cols-[40px_minmax(150px,_1fr)_140px_120px_120px_minmax(90px,_1fr)_60px] sticky top-0 h-10 items-center bg-(--background)",
            )}
          >
            <div className="flex h-full items-center justify-center border-b border-(--borderColor)">
              <Button
                onClick={itemAllToggle}
                className={clsx(
                  "size-5 rounded-xs outline-none items-center cursor-pointer ",
                  layoutsCheckedSet.size === 0
                    ? "text-(--descriptionColor)"
                    : "text-(--currentColor) ",
                )}
              >
                <SelectAllIconComponent size={20} />
              </Button>
            </div>
            <Button
              onClick={() => {
                setLayoutsSortUp(!layoutsSortUp);
              }}
              className="group flex flex-row h-full items-center px-2.5 border-b border-(--borderColor) outline-none"
            >
              <span className="text-xs">Layouts</span>
              <div className="flex size-6 p-1 items-center cursor-pointer hover:bg-(--secondHoverBackground)">
                <LayoutsSortIconComponent
                  className="hidden group-hover:block"
                  size={20}
                />
              </div>
            </Button>
            <div className="flex flex-row h-full items-center px-2.5 border-b border-(--borderColor)">
              <span className="text-xs">Type</span>
            </div>
            <Button
              onClick={() => {
                setLastUpdatedSortUp(!lastUpdatedSortUp);
              }}
              className="group flex flex-row h-full items-center px-2.5 border-b border-(--borderColor) outline-none"
            >
              <span className="text-xs">Last Updated</span>
              <div className="flex size-6 p-1 items-center cursor-pointer hover:bg-(--secondHoverBackground)">
                <LastUpdatedSortIconComponent
                  className="hidden group-hover:block"
                  size={20}
                />
              </div>
            </Button>
            <Button
              onClick={() => {
                setLastOpenedSortUp(!lastOpenedSortUp);
              }}
              className="group flex flex-row h-full items-center px-2.5 border-b border-(--borderColor) outline-none"
            >
              <span className="text-xs">Last Opened</span>
              <div className="flex size-6 p-1 items-center cursor-pointer hover:bg-(--secondHoverBackground)">
                <LastOpenedSortIconComponent
                  className="hidden group-hover:block"
                  size={20}
                />
              </div>
            </Button>
            <div className="h-full px-2.5 border-b border-(--borderColor)" />
            <div className="h-full px-2.5 border-b border-(--borderColor)" />
          </div>
          {filteredLayouts.map(([uuid, data], index) => (
            // biome-ignore lint/a11y/noStaticElementInteractions: just ignore
            // biome-ignore lint/a11y/useKeyWithClickEvents:  just ignore
            <div
              onClick={() => {
                console.log("div");
                itemToggle(uuid);
              }}
              key={uuid}
              className={clsx(
                "group grid grid-cols-[40px_minmax(150px,_1fr)_140px_120px_120px_minmax(90px,_1fr)_60px] h-10 items-center",
              )}
            >
              <div
                className={clsx(
                  "group flex h-full items-center justify-center ",
                  layoutsCheckedSet.has(uuid)
                    ? "bg-(--currentColorBackground) group-hover:bg-(--currentColorHoverBackground)"
                    : "group-hover:bg-(--secondHoverBackground)",
                  {
                    "border-t border-(--dataGridBorderColor)": index !== 0,
                  },
                )}
              >
                <Button
                  onClick={(event) => {
                    event.stopPropagation();
                    itemToggle(uuid);
                  }}
                  className={clsx(
                    "size-5 rounded-xs outline-none items-center cursor-pointer",
                    layoutsCheckedSet.has(uuid)
                      ? "text-(--currentColor) "
                      : "text-(--descriptionColor)",
                  )}
                >
                  {layoutsCheckedSet.has(uuid) ? (
                    <MdCheckBox size={20} />
                  ) : (
                    <MdCheckBoxOutlineBlank
                      className="hidden group-hover:block"
                      size={20}
                    />
                  )}
                </Button>
              </div>
              <div
                className={clsx(
                  "flex h-full px-2.5 items-center",
                  layoutsCheckedSet.has(uuid)
                    ? "bg-(--currentColorBackground) group-hover:bg-(--currentColorHoverBackground)"
                    : "group-hover:bg-(--secondHoverBackground)",
                  {
                    "border-t border-(--dataGridBorderColor)": index !== 0,
                  },
                )}
              >
                <span className="text-xs text-(--descriptionColor) ">
                  {data.name}
                </span>
              </div>
              <div
                className={clsx(
                  "flex h-full px-2.5 items-center",
                  layoutsCheckedSet.has(uuid)
                    ? "bg-(--currentColorBackground) group-hover:bg-(--currentColorHoverBackground)"
                    : "group-hover:bg-(--secondHoverBackground)",
                  {
                    "border-t border-(--dataGridBorderColor)": index !== 0,
                  },
                )}
              >
                <span className="text-xs text-(--descriptionColor) ">
                  {data.type}
                </span>
              </div>
              <div
                className={clsx(
                  "flex h-full px-2.5 items-center",
                  layoutsCheckedSet.has(uuid)
                    ? "bg-(--currentColorBackground) group-hover:bg-(--currentColorHoverBackground)"
                    : "group-hover:bg-(--secondHoverBackground)",
                  {
                    "border-t border-(--dataGridBorderColor)": index !== 0,
                  },
                )}
              >
                {data.lastUpdated && (
                  <>
                    <span
                      className="text-xs text-(--descriptionColor)"
                      data-tooltip-id={`lastUpdated:${uuid}`}
                      data-tooltip-content={getDateFormat(data.lastUpdated)}
                      data-tooltip-place="bottom"
                      data-tooltip-variant={
                        resolvedTheme === "dark" ? "dark" : "light"
                      }
                    >
                      {formatDistance(data.lastUpdated, date, {
                        addSuffix: true,
                      })}
                    </span>

                    <Tooltip
                      id={`lastUpdated:${uuid}`}
                      style={{ fontSize: "12px", lineHeight: "1.333" }}
                    />
                  </>
                )}
              </div>
              <div
                className={clsx(
                  "flex h-full px-2.5 items-center",
                  layoutsCheckedSet.has(uuid)
                    ? "bg-(--currentColorBackground) group-hover:bg-(--currentColorHoverBackground)"
                    : "group-hover:bg-(--secondHoverBackground)",
                  {
                    "border-t border-(--dataGridBorderColor)": index !== 0,
                  },
                )}
              >
                {data.lastOpened && (
                  <>
                    <span
                      className="text-xs text-(--descriptionColor)"
                      data-tooltip-id={`lastOpened:${uuid}`}
                      data-tooltip-content={getDateFormat(data.lastOpened)}
                      data-tooltip-place="bottom"
                      data-tooltip-variant={
                        resolvedTheme === "dark" ? "dark" : "light"
                      }
                    >
                      {formatDistance(data.lastOpened, date, {
                        addSuffix: true,
                      })}
                    </span>

                    <Tooltip
                      id={`lastOpened:${uuid}`}
                      style={{ fontSize: "12px", lineHeight: "1.333" }}
                    />
                  </>
                )}
              </div>
              <div
                className={clsx(
                  "flex h-full px-2.5 items-center justify-end",
                  layoutsCheckedSet.has(uuid)
                    ? "bg-(--currentColorBackground) group-hover:bg-(--currentColorHoverBackground)"
                    : "group-hover:bg-(--secondHoverBackground)",
                  {
                    "border-t border-(--dataGridBorderColor)": index !== 0,
                  },
                )}
              >
                <Button
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                  className={clsx(
                    "outline-none border items-center cursor-pointer",
                    "hidden group-hover:block text-(--currentColorHalfOpacity) hover:text-(--currentColor)",
                  )}
                >
                  <span className="text-xs px-4">Open</span>
                </Button>
              </div>
              <div
                className={clsx(
                  "flex h-full px-2.5 items-center justify-center",
                  layoutsCheckedSet.has(uuid)
                    ? "bg-(--currentColorBackground) group-hover:bg-(--currentColorHoverBackground)"
                    : "group-hover:bg-(--secondHoverBackground)",
                  {
                    "border-t border-(--dataGridBorderColor)": index !== 0,
                  },
                )}
              >
                <Button
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                  className={clsx(
                    "outline-none items-center p-2.5 cursor-pointer",
                    "text-(--descriptionColor) hover:text-(--foreground) hover:bg-(--dataIconHoverColor)",
                  )}
                >
                  <HiEllipsisVertical size={20} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
