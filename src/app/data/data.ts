import type { IconType } from "react-icons";
import {
  FaClapperboard,
  FaGear,
  FaHouse,
  FaMicrochip,
  FaRegBookmark,
  FaRegCircleStop,
  FaTableCellsLarge,
} from "react-icons/fa6";

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
    icon: FaHouse,
  },
  {
    name: "设备",
    title: "设备",
    href: "/dashboard/devices",
    icon: FaMicrochip,
  },
  {
    name: "录制",
    title: "录制",
    href: "/dashboard/recordings",
    icon: FaRegCircleStop,
  },
  {
    name: "事件",
    title: "事件",
    href: "/dashboard/events",
    icon: FaRegBookmark,
  },
  {
    name: "时间轴",
    title: "时间轴",
    href: "/dashboard/timeline",
    icon: FaClapperboard,
  },
  {
    name: "布局",
    title: "布局",
    href: "/dashboard/layouts",
    icon: FaTableCellsLarge,
  },
];

export const settingLinks: LinksProps[] = [
  { name: "设置", title: "设置", href: "/settings", icon: FaGear },
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
