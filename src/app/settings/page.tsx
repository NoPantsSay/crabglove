"use client";

import {
  Field,
  Fieldset,
  Label,
  Legend,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { useMemo, useState } from "react";
import { BsLaptopFill } from "react-icons/bs";
import { HiChevronDown, HiMiniMoon, HiMiniSun } from "react-icons/hi2";

import {
  timeFormats,
  timeFormatsMap,
  useTimeZoneStore,
} from "@/app/data/useTimeZoneStore";

const themes = [
  { name: "暗色", theme: "dark", icon: HiMiniMoon },
  { name: "亮色", theme: "light", icon: HiMiniSun },
  { name: "跟随系统", theme: "system", icon: BsLaptopFill },
];

export default function Page() {
  const { theme, setTheme } = useTheme();
  const { timeFormat, setTimeFormat } = useTimeZoneStore();

  const date = useMemo(() => new Date(), []);
  const { timeZone } = useTimeZoneStore();

  return (
    <div className="flex flex-auto flex-col p-6">
      <Fieldset className="flex flex-col border border-(--borderColor)">
        <Legend className="text-xl p-4">外观</Legend>
        <hr className="border-(--borderColor)" />
        <div className="flex flex-col p-4">
          <Field>
            <div className="mb-1 py-1">
              <Label className="text-xs text-(--descriptionColor)">
                配色方案
              </Label>
            </div>
            <RadioGroup
              value={theme}
              onChange={setTheme}
              className="flex flex-row"
            >
              {themes.map((data) => (
                <Radio
                  key={data.theme}
                  value={data.theme}
                  className={({ checked }) =>
                    clsx(
                      "flex flex-row min-h-8 py-1 px-4 gap-2 border border-(--borderColor) items-center text-xs",
                      checked
                        ? "text-(--currentColor) bg-(--currentColorBackground) hover:bg-(--currentColorHoverBackground)"
                        : "hover:bg-(--secondHoverBackground)",
                    )
                  }
                >
                  <data.icon size={20} />
                  {data.name}
                </Radio>
              ))}
            </RadioGroup>
          </Field>
          <Field className="mt-4">
            <div className="mb-1 py-1">
              <Label className="text-xs text-(--descriptionColor)">
                时间戳格式
              </Label>
            </div>
            <Listbox value={timeFormat} onChange={setTimeFormat}>
              <ListboxButton
                className={clsx(
                  "relative w-full py-2 pl-2.5 pr-8 border border-(--borderColor) hover:border-(--foreground) focus:border-(--currentColor) data-open:border-(--currentColor) outline-none text-left text-base/4",
                )}
              >
                {timeFormatsMap.get(timeFormat)?.format(date, timeZone)}
                <HiChevronDown
                  className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-(--foreground)"
                  aria-hidden="true"
                />
              </ListboxButton>
              <ListboxOptions
                anchor="bottom"
                className={clsx(
                  "w-(--button-width) py-2 bg-(--secondBackground) outline-none",
                )}
              >
                {timeFormats.map((data) => (
                  <ListboxOption
                    key={data.name}
                    value={data.name}
                    className={clsx(
                      "py-1.5 px-4 hover:bg-(--secondHoverBackground) data-selected:bg-(--currentColorBackground) data-selected:hover:bg-(--currentColorHoverBackground)",
                    )}
                  >
                    <Label className=" text-base pointer-events-none">
                      {data.format(date, timeZone)}
                    </Label>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Listbox>
          </Field>
        </div>
      </Fieldset>
    </div>
  );
}
