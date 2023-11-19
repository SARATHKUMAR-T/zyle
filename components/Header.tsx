"use client";
import React from "react";
import { Button } from "./ui/button";
import { PlusCircleIcon } from "lucide-react";
import { ModeToggle } from "./ToggleButton";

export default function Header({ setIsFormOpen }: { setIsFormOpen: any }) {
  return (
    <div className=" h-[10vh] flex flex-col justify-end py-2   max-w-full">
      <header className="flex max-w-full  justify-between items-center px-8">
        <h2 className="font-bold text-xl">Customers</h2>
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button onClick={() => setIsFormOpen(true)}>
            <PlusCircleIcon className="mr-2" /> Add Customer
          </Button>
        </div>
      </header>
      <div className="max-w-full w-full h-[2px] bg-gray-300 dark:bg-gray-700 mt-3" />
    </div>
  );
}
