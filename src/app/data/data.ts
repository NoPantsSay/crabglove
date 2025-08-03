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

interface LinksProps {
  name: string;
  title: string;
  href: string;
  icon?: IconType;
}

export const browseLinks: LinksProps[] = [
  {
    name: "仪表盘",
    title: "仪表盘",
    href: "/dashboard",
    icon: HiOutlineHome,
  },
  {
    name: "设备",
    title: "设备",
    href: "/dashboard/devices",
    icon: HiOutlineSquares2X2,
  },
  {
    name: "录制",
    title: "录制",
    href: "/dashboard/recordings",
    icon: HiOutlineStopCircle,
  },
  {
    name: "事件",
    title: "事件",
    href: "/dashboard/events",
    icon: HiOutlineBookmark,
  },
  {
    name: "时间轴",
    title: "时间轴",
    href: "/dashboard/timeline",
    icon: HiOutlineBars3,
  },
  {
    name: "布局",
    title: "布局",
    href: "/dashboard/layouts",
    icon: RiLayoutMasonryLine,
  },
];

export const settingLinks: LinksProps[] = [
  { name: "设置", title: "设置", href: "/settings", icon: IoSettingsOutline },
];

export const userSettingsLinks: LinksProps[] = [
  {
    name: "通用",
    title: "设置",
    href: "/settings",
  },
  {
    name: "插件",
    title: "设置",
    href: "/settings/extensions",
  },
  {
    name: "桌面",
    title: "设置",
    href: "/settings/desktop",
  },
];

export const dashboardLinksMap = new Map([
  ...browseLinks.map((link) => [link.href, link] as const),
  ...settingLinks.map((link) => [link.href, link] as const),
  ...userSettingsLinks.map((link) => [link.href, link] as const),
]);
