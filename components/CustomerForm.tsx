"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

// form schema for customer
const formSchema = z.object({
  name: z.string().nonempty({
    message: "Name is required.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  phone: z.string().refine(
    value => {
      return /^\d{10}$/.test(value);
    },
    {
      message: "Invalid phone number. Please enter a 10-digit phone number.",
    }
  ),
  address: z.string().nonempty({
    message: "Address is required.",
  }),
  source: z.string().nonempty({
    message: "Source is required.",
  }),
  gst: z.string().nonempty({
    message: "Source is required.",
  }),
});

export default function CustomerForm({
  setIsFormOpen,
}: {
  setIsFormOpen: any;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // initializing the react form hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      source: "",
      gst: "",
    },
  });

  const token = localStorage.getItem("token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["x-auth-token"] = token;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const res = await fetch(
        "https://zyle-backend.vercel.app/api/upload-lead",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers,
        }
      );
      const final = await res.json();

      if ((final.message = "Lead uploaded successfully")) {
        setIsLoading(false);
        toast({
          title: final.message,
          description: "Here You Go",
          duration: 4000,
        });
        queryClient.invalidateQueries({ queryKey: ["getLeads"] });
        setIsFormOpen(false);
        form.reset();
      } else {
        setIsLoading(false);
        toast({
          title: final.message,
          description: "Try Again🚀",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Unknown Error ",
        description: "Try Again🚀",
        variant: "destructive",
        duration: 3000,
      });
    }
  }

  return (
    <div className="absolute inset-0 backdrop-blur-md flex  items-center z-50 justify-center">
      <Card className="max-w-2xl relative mx-auto w-full">
        <Button
          variant="outline"
          className="absolute border-0 rounded-full right-0"
          onClick={prev => setIsFormOpen(!prev)}
        >
          <X />
        </Button>
        <CardHeader>
          <CardTitle>CustomerForm</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 w-3/4 mx-auto "
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jhone Doe" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="jhon@email.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter Number 10 Digits..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Chennai-TN" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter Source"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gst"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GST</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Enter GST" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full !mt-6  "
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    <span>Creating...</span>
                  </>
                ) : (
                  <span>Create</span>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
