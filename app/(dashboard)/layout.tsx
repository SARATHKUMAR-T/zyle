"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeftCircleIcon, Menu } from "lucide-react";
import React, { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [asideOpen, setAsideOpen] = useState(true);

  return (
    <div
      className={`${
        asideOpen ? "grid-cols-[17rem,auto]" : "grid-cols-1"
      } relative  max-h-screen grid grid-rows-1 overflow-hidden`}
    >
      {/* sidebar */}
      {asideOpen && (
        <div className=" max-h-[100vh] h-full border-r-2 flex flex-col gap-2 items-center  p-4">
          <h4 className="text-lg font-semibold tracking-wide capitalize">
            Zyle
          </h4>
        </div>
      )}
      {/* main section pdf viweport */}
      <div className="h-full relative w-full max-w-full min-h-screen max-h-[100vh] overflow-y-scroll p-4">
        {children}
      </div>
    </div>
  );
}
