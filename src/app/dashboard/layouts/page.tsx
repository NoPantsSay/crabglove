"use client";

import {
  Button,
  Checkbox,
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
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  HiArrowDown,
  HiArrowUp,
  HiCheck,
  HiChevronDown,
  HiChevronUp,
} from "react-icons/hi2";
import { PiDownload } from "react-icons/pi";
import { RiLayoutMasonryLine } from "react-icons/ri";

import {
  layoutTypes,
  layoutUpdateFilters,
  useLayouts,
} from "@/app/data/useLayouts";

export default function Page() {
  const { getLayoutTypeDisplay, getlayoutUpdateFilterDisplay } = useLayouts();
  const [inputValue, setInputValue] = useState("");
  const [layoutType, setLayoutType] = useState(layoutTypes[0].name);
  const [layoutUpdateFilter, setLayoutUpdateFilter] = useState(
    layoutUpdateFilters[0].name,
  );
  const [headerChecked, setHeaderChecked] = useState(false);
  const [layoutsSortUp, setLayoutsSortUp] = useState(false);

  const LayoutsSortIconComponent = layoutsSortUp ? HiArrowUp : HiArrowDown;

  return (
    <div className="flex flex-auto p-6 overflow-hidden">
      <div className="flex flex-auto flex-col border border-(--borderColor) overflow-x-auto">
        {/* 标题栏 */}
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
        {/* 过滤栏 */}
        <div className="flex flex-row gap-3 justify-between items-center p-3 overflow-x-auto">
          {/* 名字 */}
          <Field className="flex flex-col min-w-25 w-full">
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
          {/* 类型 */}
          <Field className="flex flex-col min-w-25 w-full">
            <Label className="py-1 text-sm text-(--descriptionColor) ">
              Type
            </Label>
            <Listbox value={layoutType} onChange={setLayoutType}>
              <ListboxButton
                className={clsx(
                  "relative w-full py-2 px-2.5 text-sm text-(--descriptionColor) border border-(--borderColor) hover:border-(--foreground) focus:border-(--currentColor) data-open:border-(--currentColor) rounded-none outline-none text-left cursor-pointer",
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
          {/* 过滤更新时间 */}
          <Field className="flex flex-col min-w-25 w-full">
            <Label className="py-1 text-sm text-(--descriptionColor) ">
              Type
            </Label>
            <Listbox
              value={layoutUpdateFilter}
              onChange={setLayoutUpdateFilter}
            >
              <ListboxButton
                className={clsx(
                  "relative w-full py-2 px-2.5 text-sm text-(--descriptionColor) border border-(--borderColor) hover:border-(--foreground) focus:border-(--currentColor) data-open:border-(--currentColor) rounded-none outline-none text-left cursor-pointer",
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
        <hr className="mt-2 border-0  border-b border-(--borderColor)"></hr>
        <div className="block relative">
          {/* <div className="absolute"></div> */}
          <div className="flex flex-col overflow-auto">
            <div className="flex flex-row sticky h-10 border-b border-(--borderColor) items-center">
              <div className="flex flex-row w-10 h-full items-center justify-center">
                <Checkbox
                  checked={headerChecked}
                  onChange={setHeaderChecked}
                  className={clsx(
                    "group size-5 rounded-xs bg-(--background) outline-none data-checked:bg-(--currentColor) items-center cursor-pointer",
                    {
                      "ring-2 ring-(--descriptionColor) ring-inset":
                        !headerChecked,
                    },
                  )}
                >
                  <HiCheck
                    className="hidden fill-(--background) group-data-checked:block"
                    size={20}
                  />
                </Checkbox>
              </div>
              <div className="flex flex-row w-37.5 h-full items-center px-2.5">
                <span className="text-xs">Layouts</span>
                <Button
                  onClick={() => {
                    setLayoutsSortUp(!layoutsSortUp);
                  }}
                  className="group flex size-6 p-1 items-center outline-none cursor-pointer hover:bg-(--secondHoverBackground)"
                >
                  <LayoutsSortIconComponent
                    className="hidden group-hover:block"
                    size={20}
                  />
                </Button>
              </div>
              <div className="flex flex-row w-35 h-full items-center px-2.5">
                <span className="text-xs">Type</span>
              </div>
              <div className="flex flex-row w-30 h-full items-center px-2.5">
                <span className="text-xs">Last Updated</span>
              </div>
              <div className="flex flex-row w-30 h-full items-center px-2.5">
                <span className="text-xs">Last Opened</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
