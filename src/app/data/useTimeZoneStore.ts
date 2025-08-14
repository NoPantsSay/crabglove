import { formatInTimeZone } from "date-fns-tz";
import { enUS } from "date-fns/locale/en-US";
import { Decimal } from "decimal.js";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const detectedTimeZone =
  Intl.DateTimeFormat().resolvedOptions().timeZone;

export const timeFormats = [
  {
    name: "12-hour",
    format: (date: Date, timeZone: string) =>
      formatInTimeZone(date, timeZone, "yyyy-MM-dd hh:mm:ss.SSS aa zzz", {
        locale: enUS,
      }),
  },
  {
    name: "24-hour",
    format: (date: Date, timeZone: string) =>
      formatInTimeZone(date, timeZone, "yyyy-MM-dd HH:mm:ss.SSS zzz", {
        locale: enUS,
      }),
  },
  {
    name: "RFC3339",
    format: (date: Date, timeZone: string) =>
      formatInTimeZone(date, timeZone, "yyyy-MM-dd'T'HH:mm:ssXXX", {
        locale: enUS,
      }),
  },
  {
    name: "Seconds",
    format: (date: Date, timeZone: string) =>
      Decimal(date.getTime()).dividedBy(1000).toFixed(9),
  },
] as const;

export const timeFormatsMap = new Map(
  timeFormats.map((data) => [data.name as string, data] as const),
);

interface timeZoneState {
  timeZone: string;
  isDetected: boolean;
  timeFormat: string;
  setTimeZone: (input: string) => void;
  setIsDetected: (input: boolean) => void;
  setTimeFormat: (input: string) => void;
}

export const useTimeZoneStore = create<timeZoneState>()(
  persist(
    (set) => ({
      timeZone: detectedTimeZone,
      isDetected: true,
      timeFormat: timeFormats[0].name,
      setTimeZone: (input: string) => {
        set({ timeZone: input });
      },
      setIsDetected: (input: boolean) => {
        set({ isDetected: input });
      },
      setTimeFormat: (input: string) => {
        set({ timeFormat: input });
      },
    }),
    {
      name: "timeZone", // unique name
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.isDetected) {
          console.log("重置当前时区为检测时间");
          return { timeZone: detectedTimeZone };
        }
      },
    },
  ),
);
