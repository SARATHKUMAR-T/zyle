import React from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Card } from "./ui/card";

export default function CustomerForm({
  setIsFormOpen,
}: {
  setIsFormOpen: any;
}) {
  return (
    <div className="absolute inset-0 backdrop-blur-md flex items-center justify-center">
      <Card>
        <Button variant="outline" onClick={prev => setIsFormOpen(!prev)}>
          <X />
        </Button>
        CustomerForm
      </Card>
    </div>
  );
}
