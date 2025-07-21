import {
  FaClapperboard,
  FaHouse,
  FaMicrochip,
  FaRegBookmark,
  FaRegCircleStop,
  FaTableCellsLarge,
} from "react-icons/fa6";

export const browseLinks = [
  { name: "仪表盘", href: "/", icon: FaHouse },
  { name: "设备", href: "/devices", icon: FaMicrochip },
  { name: "录制", href: "/recordings", icon: FaRegCircleStop },
  { name: "事件", href: "/events", icon: FaRegBookmark },
  { name: "时间轴", href: "/timeline", icon: FaClapperboard },
  { name: "布局", href: "/layouts", icon: FaTableCellsLarge },
];

export const browseLinksMap = new Map(
  browseLinks.map((link) => [link.href, link]),
);
