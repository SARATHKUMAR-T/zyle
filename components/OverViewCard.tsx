"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Activity, Shield, ShieldEllipsis, XSquare } from "lucide-react";

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
      color: "bg-gradient-to-r from-[#000428] to-[#004e92] ",

      icon: <Activity className="h-8 w-8" />,
    },
    {
      title: "Active Customers",
      color: "bg-gradient-to-b from-[#52c234] to-[#061700] ",
      count: activeCustomers?.length || 0,
      icon: <ShieldEllipsis className="h-8 w-8" />,
    },
    {
      title: "Closed Deals",
      color: "bg-gradient-to-r from-[#c31432] to-[#240b36] ",
      count: closedCustomers?.length || 0,
      icon: <XSquare className="h-8 w-8" />,
    },
  ];
  return (
    <div className="flex w-full  flex-wrap   gap-3 mt-5 items-center justify-around 2xl:px-16 2xl:gap-12">
      {cards.map((item, i) => (
        <Card
          key={i}
          className={`${item?.color} min-w-[18rem] text-white 2xl:grow h-24 rounded-sm`}
        >
          <CardHeader className="p-2">
            <CardTitle className="text-sm font-normal pl-2 ">
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
