import type { IconType } from "react-icons";

import {
  HiOutlineBars3,
  HiOutlineBookmark,
  HiOutlineHome,
  HiOutlineSquares2X2,
  HiOutlineStopCircle,
} from "react-icons/hi2";

import { RiLayoutMasonryLine } from "react-icons/ri";

import { IoSettingsOutline } from "react-icons/io5";

export const browseLinks = [
  {
    name: "dashboard.dashboard",
    title: "dashboard.dashboard",
    href: "/dashboard",
    icon: HiOutlineHome,
  },
  {
    name: "dashboard.devices",
    title: "dashboard.devices",
    href: "/dashboard/devices",
    icon: HiOutlineSquares2X2,
  },
  {
    name: "dashboard.recordings",
    title: "dashboard.recordings",
    href: "/dashboard/recordings",
    icon: HiOutlineStopCircle,
  },
  {
    name: "dashboard.events",
    title: "dashboard.events",
    href: "/dashboard/events",
    icon: HiOutlineBookmark,
  },
  {
    name: "dashboard.timeline",
    title: "dashboard.timeline",
    href: "/dashboard/timeline",
    icon: HiOutlineBars3,
  },
  {
    name: "dashboard.layouts",
    title: "dashboard.layouts",
    href: "/dashboard/layouts",
    icon: RiLayoutMasonryLine,
  },
] as const;

export const settingLinks = [
  {
    name: "setting.settings",
    title: "setting.settings",
    href: "/settings",
    icon: IoSettingsOutline,
  },
] as const;

export const userSettingsLinks = [
  {
    name: "setting.general",
    title: "setting.settings",
    href: "/settings",
  },
  {
    name: "setting.extensions",
    title: "setting.settings",
    href: "/settings/extensions",
  },
  {
    name: "setting.desktop",
    title: "setting.settings",
    href: "/settings/desktop",
  },
] as const;

export const titlesMap = new Map([
  ...browseLinks.map(
    (link) => [link.href as string, link.title as string] as const,
  ),
  ...settingLinks.map(
    (link) => [link.href as string, link.title as string] as const,
  ),
  ...userSettingsLinks.map(
    (link) => [link.href as string, link.title as string] as const,
  ),
]);
