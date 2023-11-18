"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Activity,
  Shield,
  ShieldEllipsis,
  ShieldHalf,
  XSquare,
} from "lucide-react";

export default function OverViewCard({ allLeads }: { allLeads: any }) {
  const activeCustomers = allLeads?.filter(
    (item: any) => item.status === "active"
  );
  const closedCustomers = allLeads?.filter(
    (item: any) => item.status === "closed"
  );

  const cards = [
    {
      title: "Total Customers",
      count: allLeads?.length || 0,
      icon: <Activity className="h-8 w-8" />,
    },
    {
      title: "Active Customers",
      color: "bg-green-400",
      count: activeCustomers?.length || 0,
      icon: <ShieldEllipsis className="h-8 w-8" />,
    },
    {
      title: "Closed Deals",
      color: "bg-red-400",
      count: closedCustomers?.length || 0,
      icon: <XSquare className="h-8 w-8" />,
    },
  ];
  return (
    <div className="flex flex-wrap gap-3 mt-5 items-center justify-around 2xl:px-16 2xl:gap-12">
      <div className="max-w-full w-full h-[2px] bg-gray-300 dark:bg-gray-700 mt-3" />

      {cards.map((item, i) => (
        <Card
          key={i}
          className={`${item?.color} min-w-[18rem] 2xl:grow h-24 rounded-sm`}
        >
          <CardHeader className="p-2">
            <CardTitle className="text-sm font-normal pl-2 text-muted-foreground">
              {item.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between">
            <p className="text-3xl font-semibold">{item.count}</p>
            {item?.icon}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
