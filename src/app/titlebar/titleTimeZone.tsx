"use client";

import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import clsx from "clsx";
import { enUS } from "date-fns/locale/en-US";
import { formatInTimeZone } from "date-fns-tz";
import { useMemo, useRef, useState } from "react";
import { SlGlobe } from "react-icons/sl";

import {
  detectedTimeZone,
  useTimeZoneStore,
} from "@/app/data/useTimeZoneStore";

const timeZones = Intl.supportedValuesOf("timeZone");

interface TimeZoneData {
  timeZone: string;
  display: string;
  isDivide: boolean;
  isDetected: boolean;
}

function getGMT(timeZone: string): string {
  return formatInTimeZone(new Date(), timeZone, "OOOO", {
    locale: enUS,
  });
}

function getGMTShort(timeZone: string): string {
  return formatInTimeZone(new Date(), timeZone, "zzz", {
    locale: enUS,
  });
}

const timeZoneDatas: TimeZoneData[] = [
  {
    timeZone: detectedTimeZone,
    display: `Detected:${detectedTimeZone}`,
    isDivide: false,
    isDetected: true,
  },
  {
    timeZone: "UTC",
    display: "UTC",
    isDivide: false,
    isDetected: false,
  },
  {
    timeZone: "",
    display: "",
    isDivide: true,
    isDetected: false,
  },
  ...timeZones
    .filter((timeZone) => timeZone !== "UTC")
    .map((timeZone) => {
      return {
        timeZone,
        display: timeZone,
        isDivide: false,
        isDetected: false,
      };
    }),
];

export function TitleTimeZone() {
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<TimeZoneData | null>(null);
  const { timeZone, setTimeZone, setIsDetected } = useTimeZoneStore();

  const filteredTimeZone = useMemo(() => {
    return query === ""
      ? timeZoneDatas
      : timeZoneDatas.filter((data) => {
          return data.display.toLowerCase().includes(query.toLowerCase());
        });
  }, [query]);

  return (
    <Popover>
      <PopoverButton
        ref={buttonRef}
        onClick={() => {
          setTimeout(() => {
            buttonRef.current?.blur();
          }, 0);
        }}
        className="flex gap-2 px-3 py-2.5 items-center hover:bg-[#3f3f3f] focus:not-data-focus:outline-none cursor-pointer"
      >
        <SlGlobe size={20} />
        <span className="text-center text-xs/6">{getGMTShort(timeZone)}</span>
      </PopoverButton>
      <PopoverPanel
        anchor="bottom end"
        className="flex flex-col w-95 bg-(--secondBackground) shadow-lg"
      >
        {({ close }) => {
          inputRef.current?.focus();
          return (
            <Combobox
              value={selected}
              virtual={{
                options: filteredTimeZone,
              }}
              onChange={(value) => {
                setSelected(value);
                if (value) {
                  setTimeZone(value.timeZone);
                  setIsDetected(value.isDetected);
                  close();
                }
              }}
              onClose={() => {
                setQuery("");
                setSelected(null);
                setTimeout(() => {
                  buttonRef.current?.blur();
                }, 0);
              }}
            >
              <div className="w-full p-1.5">
                <ComboboxInput
                  ref={inputRef}
                  autoFocus
                  className="w-full py-1.5 px-2 text-xs/4.5 outline-none bg-[#0000000f] dark:bg-[#ffffff17]"
                  displayValue={(timeZone: TimeZoneData | null) =>
                    timeZone?.timeZone ?? ""
                  }
                  placeholder={`current:${timeZone}`}
                  onChange={(event) => {
                    setQuery(event.target.value);
                  }}
                />
              </div>
              <div>
                <ComboboxOptions
                  static
                  className="w-full min-h-8 max-h-80 overflow-y-auto"
                >
                  {({ option }: { option: TimeZoneData }) => (
                    <ComboboxOption
                      key={option.timeZone}
                      value={option}
                      disabled={option.isDivide}
                      className={clsx(
                        "w-full group flex cursor-pointer justify-between items-center px-4 py-1.5 text-xs/5 select-none",
                        option.timeZone === timeZone
                          ? "bg-(--currentColorBackground) data-focus:bg-(--currentColorHoverBackground)"
                          : "data-focus:bg-(--secondHoverBackground)",
                        {
                          "py-2": option.isDivide,
                        },
                      )}
                    >
                      {option.isDivide ? (
                        <hr className="w-full border-(--borderColor)" />
                      ) : (
                        <>
                          <span>{option.display}</span>
                          <span>{getGMT(option.timeZone)}</span>
                        </>
                      )}
                    </ComboboxOption>
                  )}
                </ComboboxOptions>
              </div>
            </Combobox>
          );
        }}
      </PopoverPanel>
    </Popover>
  );
}
