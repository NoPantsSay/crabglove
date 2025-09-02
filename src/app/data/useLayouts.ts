import {
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInCalendarYears,
} from "date-fns";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface LayoutTypeInfo {
  name: string;
  display: string;
}

export const layoutTypes: LayoutTypeInfo[] = [
  {
    name: "all",
    display: "All",
  },
  {
    name: "local",
    display: "Local",
  },
  {
    name: "online",
    display: "Online",
  },
];

const layoutTypesMap = new Map(layoutTypes.map((data) => [data.name, data]));

interface LayoutUpdateFilterInfo {
  name: string;
  display: string;
  filter: (laterDate: Date, earlierDate: Date) => boolean;
}

export const layoutUpdateFilters: LayoutUpdateFilterInfo[] = [
  {
    name: "all",
    display: "All time",
    filter: (_laterDate: Date, _earlierDate: Date) => {
      return true;
    },
  },
  {
    name: "today",
    display: "Today",
    filter: (laterDate: Date, earlierDate: Date) => {
      return differenceInCalendarDays(laterDate, earlierDate) === 0;
    },
  },
  {
    name: "yesterday",
    display: "Yesterday",
    filter: (laterDate: Date, earlierDate: Date) => {
      return differenceInCalendarDays(laterDate, earlierDate) === 1;
    },
  },
  {
    name: "last7Days",
    display: "Last 7 Days",
    filter: (laterDate: Date, earlierDate: Date) => {
      return differenceInCalendarDays(laterDate, earlierDate) <= 7;
    },
  },
  {
    name: "last30Days",
    display: "Last 30 Days",
    filter: (laterDate: Date, earlierDate: Date) => {
      return differenceInCalendarDays(laterDate, earlierDate) <= 30;
    },
  },
  {
    name: "thisMonth",
    display: "This month",
    filter: (laterDate: Date, earlierDate: Date) => {
      return differenceInCalendarMonths(laterDate, earlierDate) === 0;
    },
  },
  {
    name: "lastMonth",
    display: "Last month",
    filter: (laterDate: Date, earlierDate: Date) => {
      return differenceInCalendarMonths(laterDate, earlierDate) === 1;
    },
  },
  {
    name: "thisYear",
    display: "This year",
    filter: (laterDate: Date, earlierDate: Date) => {
      return differenceInCalendarYears(laterDate, earlierDate) === 0;
    },
  },
];

const layoutUpdateFiltersMap = new Map(
  layoutUpdateFilters.map((data) => [data.name, data]),
);

interface LayoutsState {
  getLayoutTypeDisplay: (name: string) => string;
  getlayoutUpdateFilterDisplay: (name: string) => string;
  getlayoutUpdateFilter: (
    name: string,
  ) => (laterDate: Date, earlierDate: Date) => boolean;
}

export const useLayouts = create<LayoutsState>()(
  persist(
    () => ({
      getLayoutTypeDisplay: (name: string) => {
        const info = layoutTypesMap.get(name);
        return info ? info.display : layoutTypes[0].display;
      },
      getlayoutUpdateFilterDisplay: (name: string) => {
        const info = layoutUpdateFiltersMap.get(name);
        return info ? info.display : layoutUpdateFilters[0].display;
      },
      getlayoutUpdateFilter: (name: string) => {
        const info = layoutUpdateFiltersMap.get(name);
        return info ? info.filter : layoutUpdateFilters[0].filter;
      },
    }),
    {
      name: "layouts", // unique name
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
