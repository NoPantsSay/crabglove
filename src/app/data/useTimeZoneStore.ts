import { enUS } from "date-fns/locale/en-US";
import { formatInTimeZone } from "date-fns-tz";
import { Decimal } from "decimal.js";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const detectedTimeZone =
  Intl.DateTimeFormat().resolvedOptions().timeZone;

interface TimeFormatInfo {
  name: string;
  format: (date: Date, timeZone: string) => string;
}

export const timeFormats: TimeFormatInfo[] = [
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
    format: (date: Date, _timeZone: string) =>
      Decimal(date.getTime()).dividedBy(1000).toFixed(9),
  },
];

export const timeFormatsMap = new Map(
  timeFormats.map((data) => [data.name, data]),
);

interface timeZoneState {
  timeZone: string;
  isDetected: boolean;
  timeFormat: string;
  setTimeZone: (input: string) => void;
  setIsDetected: (input: boolean) => void;
  setTimeFormat: (input: string) => void;
  getDateFormat: (input: Date) => string;
}

export const useTimeZoneStore = create<timeZoneState>()(
  persist(
    (set, get) => ({
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
      getDateFormat: (input: Date) => {
        const { timeZone, timeFormat } = get();
        const timeFormatInfo = timeFormatsMap.get(timeFormat) ?? timeFormats[0];
        return timeFormatInfo.format(input, timeZone);
      },
    }),
    {
      name: "timeZone", // unique name
      storage: createJSONStorage(() => localStorage),
      merge: (persistedState, currentState) => {
        let timeZone = (persistedState as timeZoneState).timeZone;
        if ((persistedState as timeZoneState).isDetected) {
          console.log("重置当前时区为检测时间");
          timeZone = detectedTimeZone;
        }

        return {
          ...currentState,
          ...(persistedState as timeZoneState),
          timeZone: timeZone,
        };
      },
    },
  ),
);
