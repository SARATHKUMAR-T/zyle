"use client";
import CustomerForm from "@/components/CustomerForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dot, MoreVertical, PlusCircleIcon } from "lucide-react";
import React, { useState } from "react";

export default function Dashboard() {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [moreOptions, setMoreOptions] = useState(false);
  console.log(moreOptions);
  return (
    <>
      <header className="flex mt-5 justify-between items-center px-8">
        <h2 className="font-bold text-xl">Customers</h2>
        <Button onClick={() => setIsFormOpen(true)}>
          <PlusCircleIcon className="mr-2" /> Add Customer
        </Button>
      </header>
      <main>
        <div className="w-full h-[2px] bg-gray-300 mt-3" />
        <div className="flex flex-wrap gap-3 mt-5 items-center justify-around 2xl:px-16 2xl:gap-12">
          <Card className=" min-w-[18rem] 2xl:grow h-24 rounded-sm">
            <CardHeader className="p-2">
              <CardTitle className="text-sm font-normal pl-2 text-muted-foreground">
                Total Customers
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <p className="text-3xl font-semibold">2,420</p>
            </CardContent>
          </Card>
          <Card className=" min-w-[18rem]  2xl:grow  h-24 rounded-sm">
            <CardHeader className="p-2">
              <CardTitle className="text-sm text-muted-foreground">
                Total Customers
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <p className="text-3xl font-bold">2,420</p>
            </CardContent>
          </Card>
          <Card className=" min-w-[18rem]  2xl:grow h-24 rounded-sm">
            <CardHeader className="p-2">
              <CardTitle className="text-sm text-muted-foreground">
                Total Customers
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <p className="text-3xl font-bold">2,420</p>
            </CardContent>
          </Card>
        </div>
        <div className="max-w-full mt-20 px-10 flex gap-4">
          <Card className="relative h-64 w-60">
            <div className="absolute right-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMoreOptions(true)}
              >
                <MoreVertical />
              </Button>
              {moreOptions && (
                <Card className="absolute right-0 top-0 w-32 px-3 py-2 space-y-3">
                  <Button className="w-full" variant="secondary">
                    Edit
                  </Button>
                  <Button className="w-full" variant="destructive">
                    Delete
                  </Button>
                </Card>
              )}
            </div>
            <CardHeader></CardHeader>
          </Card>
        </div>
      </main>
      {isFormOpen && <CustomerForm setIsFormOpen={setIsFormOpen} />}
    </>
  );
}
