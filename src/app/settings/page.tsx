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
import { useMemo } from "react";
import { BsLaptopFill } from "react-icons/bs";
import {
  HiChevronDown,
  HiChevronUp,
  HiMiniMoon,
  HiMiniSun,
} from "react-icons/hi2";
import { Tooltip } from "react-tooltip";

import { languages, useLanguage } from "@/app/data/useLanguage";
import {
  timeFormats,
  timeFormatsMap,
  useTimeZoneStore,
} from "@/app/data/useTimeZoneStore";

const themes = [
  {
    display: "setting.theme.dark",
    theme: "dark",
    icon: HiMiniMoon,
  },
  {
    display: "setting.theme.light",
    theme: "light",
    icon: HiMiniSun,
  },
  {
    display: "setting.theme.follow_system",
    theme: "system",
    icon: BsLaptopFill,
  },
] as const;

export default function Page() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { timeZone, timeFormat, setTimeFormat } = useTimeZoneStore();
  const { language, setLanguage, getDisplay, getTranslator } = useLanguage();

  const translator = getTranslator();
  const languageDisplay = getDisplay();

  const date = useMemo(() => new Date(), []);

  return (
    <div className="flex flex-auto flex-col p-6">
      {/* 外观 */}
      <Fieldset className="flex flex-col border border-(--borderColor)">
        <Legend className="text-xl p-4">
          {translator("setting.appearance")}
        </Legend>
        <hr className="border-(--borderColor)" />
        <div className="flex flex-col p-4">
          {/* 主题颜色 */}
          <Field>
            <div className="mb-1 py-1">
              <Label className="text-xs text-(--descriptionColor)">
                {translator("setting.color_scheme")}
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
                  {translator(data.display)}
                </Radio>
              ))}
            </RadioGroup>
          </Field>
          {/* 时间戳格式 */}
          <Field className="mt-4">
            <div className="mb-1 py-1">
              <Label className="text-xs text-(--descriptionColor)">
                {translator("setting.timestamp_format")}
              </Label>
            </div>
            <Listbox value={timeFormat} onChange={setTimeFormat}>
              <ListboxButton
                className={clsx(
                  "relative w-full py-2 pl-2.5 pr-8 border border-(--borderColor) hover:border-(--foreground) focus:border-(--currentColor) data-open:border-(--currentColor) outline-none text-left text-base/4",
                )}
              >
                {({ open }) => {
                  const IconComponent = open ? HiChevronUp : HiChevronDown;
                  return (
                    <>
                      {timeFormatsMap.get(timeFormat)?.format(date, timeZone)}
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
                {timeFormats.map((data) => (
                  <ListboxOption
                    key={data.name}
                    value={data.name}
                    className={clsx(
                      "py-1.5 px-4 hover:bg-(--secondHoverBackground) data-focus:bg-(--secondHoverBackground) data-selected:bg-(--currentColorBackground) data-selected:hover:bg-(--currentColorHoverBackground) data-selected:data-focus:bg-(--currentColorHoverBackground)",
                    )}
                  >
                    <div
                      data-tooltip-id={data.name}
                      data-tooltip-content={data.name}
                    >
                      <Label className=" text-base pointer-events-none">
                        {data.format(date, timeZone)}
                      </Label>
                    </div>

                    <Tooltip
                      id={data.name}
                      place="left"
                      positionStrategy="fixed"
                      variant={resolvedTheme === "dark" ? "dark" : "light"}
                    />
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Listbox>
          </Field>
          {/* 语言 */}
          <Field className="mt-4">
            <div className="mb-1 py-1">
              <Label className="text-xs text-(--descriptionColor)">
                {translator("setting.language")}
              </Label>
            </div>
            <Listbox value={language} onChange={setLanguage}>
              <ListboxButton
                className={clsx(
                  "relative w-full py-2 pl-2.5 pr-8 border border-(--borderColor) hover:border-(--foreground) focus:border-(--currentColor) data-open:border-(--currentColor) outline-none text-left text-base/4",
                )}
              >
                {({ open }) => {
                  const IconComponent = open ? HiChevronUp : HiChevronDown;
                  return (
                    <>
                      {languageDisplay}
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
                {languages.map((data) => (
                  <ListboxOption
                    key={data.name}
                    value={data.name}
                    className={clsx(
                      "py-1.5 px-4 hover:bg-(--secondHoverBackground) data-focus:bg-(--secondHoverBackground) data-selected:bg-(--currentColorBackground) data-selected:hover:bg-(--currentColorHoverBackground) data-selected:data-focus:bg-(--currentColorHoverBackground)",
                    )}
                  >
                    <Label className=" text-base pointer-events-none">
                      {data.display}
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
