"use client";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

// form schema for login
const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

export default function Loginform() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const { toast } = useToast();

  // initializing the react form hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // form submission function
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const res = await fetch("http://localhost:9000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();

    if (data.message) {
      // successfull login notification
      if (data.token) {
        toast({
          title: "Admin Signed In Successfully!",
          duration: 2000,
        });
        const token = (data as { token: string }).token;
        localStorage.setItem("token", token);
        router.push("/dashboard");
        setIsLoading(false);
        form.reset();
      }
      // Failed Login call and error handling
      if (data.message === "admin doesn't exist") {
        setIsLoading(false);
        toast({
          title: "Admin Not Found!",
          variant: "destructive",
          description: "Please Login With Correct Admin Account",
        });
      } else if (data.message === "Invalid Credentials") {
        setIsLoading(false);
        toast({
          title: "Invalid Credentials!",
          variant: "destructive",
          description: "Try Again with Correct Credentials",
        });
      }
    } else {
      setIsLoading(false);
      toast({
        title: "Unknown Error!",
        description: "Please Try Again Later",
        variant: "destructive",
      });
    }
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-w-sm"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Your Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Your Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full  " disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </Button>
        </form>
      </Form>

      <Button className="mt-4 text-inherit text-end" variant="link">
        <Link href="#" className="underline text-end">
          Forgot Password?
        </Link>
      </Button>
    </>
  );
}
