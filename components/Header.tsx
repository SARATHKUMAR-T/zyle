"use client";
import React from "react";
import ThemeSwitch from "./themeSwitch";
import { Button } from "./ui/button";
import { PlusCircleIcon } from "lucide-react";

export default function Header({ setIsFormOpen }: { setIsFormOpen: any }) {
  return (
    <header className="flex max-w-full mt-5 justify-between items-center px-8">
      <h2 className="font-bold text-xl">Customers</h2>
      <div>
        <ThemeSwitch />
        <Button onClick={() => setIsFormOpen(true)}>
          <PlusCircleIcon className="mr-2" /> Add Customer
        </Button>
      </div>
    </header>
  );
}
