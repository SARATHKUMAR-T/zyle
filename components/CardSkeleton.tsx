import React from "react";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function CardSkeleton() {
  return (
    <>
      {Array.from(new Array(3), (ele, i) => (
        <Card
          key={i}
          className="relative border-1 flex flex-col justify-between h-[23rem] w-72 p-2"
        >
          <div className="flex gap-3">
            <Skeleton className="w-10 h-10" />
            <div className="space-y-2 w-full">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
          <Skeleton className="h-[80px] w-full" />
          <Skeleton className="h-[80px] w-full" />
          <Skeleton className="h-[80px] w-full" />
        </Card>
      ))}
    </>
  );
}
