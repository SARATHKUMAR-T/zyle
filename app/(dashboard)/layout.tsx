"use client";
import { Button } from "@/components/ui/button";
import {
  Bell,
  ChevronLeftCircleIcon,
  FolderKanban,
  GanttChartSquare,
  Home,
  Layers3,
  ListChecks,
  Menu,
  MessageSquare,
  PieChart,
  Power,
  Settings2,
  UserCircle2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const links = [
  {
    label: "Home",
    icon: <Home />,
    href: "#",
  },
  {
    label: "Dashboard",
    icon: <GanttChartSquare />,
    href: "/",
  },
  {
    label: "Projects",
    icon: <Layers3 />,
    href: "#",
  },
  {
    label: "Tasks",
    icon: <ListChecks />,
    href: "#",
  },
  {
    label: "Reporting",
    icon: <PieChart />,
    href: "#",
  },
  {
    label: "Users",
    icon: <UserCircle2 />,
    href: "#",
  },
];

const link2 = [
  {
    label: "Notifications",
    icon: <Bell />,
    href: "#",
  },
  {
    label: "Support",
    icon: <MessageSquare />,
    href: "#",
  },

  {
    label: "Settings",
    icon: <Settings2 />,
    href: "#",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [asideOpen, setAsideOpen] = useState(true);
  const router = useRouter();

  function logOutHandler() {
    localStorage.getItem("token") && localStorage.removeItem("token");
    router.push("/");
  }

  return (
    <div
      className={`${
        asideOpen ? "grid-cols-[17rem,auto]" : "grid-cols-1"
      } relative  max-h-screen grid grid-rows-1 overflow-hidden bg-slate-100/75 dark:bg-slate-900`}
    >
      {/* sidebar */}
      {asideOpen && (
        <div className="  max-h-screen h-full border-r-2 flex flex-col justify-between gap-2 items-center  p-4">
          <div className="flex w-full flex-col gap-3">
            <Button
              variant="ghost"
              className="text-lg mb-8 font-semibold tracking-wide capitalize"
              onClick={logOutHandler}
            >
              Zyle
            </Button>

            {links.map((item, i) => (
              <Button
                key={i}
                variant="ghost"
                className="w-full mx-auto flex justify-start hover:bg-gray-200 dark:hover:bg-gray-800 "
                asChild
              >
                <Link
                  href="/dashboard"
                  className="flex  justify-start max-w-full gap-4 items-center"
                >
                  <p className="block">{item.icon}</p>
                  <p className="block">{item.label}</p>
                </Link>
              </Button>
            ))}
          </div>

          <div className="flex w-full flex-col gap-3">
            {link2.map((item, i) => (
              <Button
                key={i}
                variant="ghost"
                className="w-full mx-auto flex justify-start hover:bg-gray-200 dark:hover:bg-gray-800 "
                asChild
              >
                <Link
                  href="/dashboard"
                  className="flex  justify-start max-w-full gap-4 items-center"
                >
                  <p className="block">{item.icon}</p>
                  <p className="block">{item.label}</p>
                </Link>
              </Button>
            ))}
            <Button
              onClick={logOutHandler}
              className="rounded-full w-14 mx-auto "
            >
              <Power />
            </Button>
          </div>
        </div>
      )}
      {/* main section viweport */}
      <div className="  w-full max-w-full h-screen   ">{children}</div>
    </div>
  );
}
