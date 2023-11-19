"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      type="button"
      className="bg-gray-400 flex ring-2 ring-black dark:ring-slate-400 dark:bg-gray-800 p-1 duration-300 transition-all rounded-full"
      onClick={() => (theme === "light" ? setTheme("dark") : setTheme("light"))}
    >
      <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <MoonIcon className=" h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
