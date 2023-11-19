"use client";
import CustomerForm from "@/components/CustomerForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BookOpen,
  IndianRupee,
  Loader2,
  MapPin,
  MoreVertical,
  Pen,
  Phone,
  PlusCircleIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import getLeads from "@/services/getLeads";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import MailerForm from "@/components/mailerForm";
import axios from "axios";
import Header from "@/components/Header";
import OverViewCard from "@/components/OverViewCard";
import { Skeleton } from "@/components/ui/skeleton";
import CardSkeleton from "@/components/CardSkeleton";

interface Leads {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  gst: string;
  source: string;
  status: string;
}

export default function Dashboard() {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [mailModal, setMailModal] = useState(false);
  const [leadMail, setLeadMail] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Route Protection
  useEffect(() => {
    function checkToken() {
      if (!localStorage.getItem("token")) {
        router.push("/");
      }
    }
    checkToken();
  }, [router]);

  // const token = localStorage.getItem("token");
  // const headers: HeadersInit = {
  //   "Content-Type": "application/json",
  // };

  // if (token) {
  //   headers["x-auth-token"] = token;
  // }
  // fetching data from the server
  const { data, isLoading } = useQuery({
    queryKey: ["getLeads"],
    queryFn: getLeads,
  });
  const allLeads: Leads[] | undefined = data?.data.lead;

  // Status handler function
  async function statusHandler(status: string, leadId: string) {
    try {
      const result = await axios.patch(
        `https://zyle-backend.vercel.app/api/update-status/${leadId}`,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (result.data.message === "Status Updated Successfully") {
        toast({
          title: result.data.message,
          duration: 2000,
        });
        queryClient.invalidateQueries({
          queryKey: ["getLeads"],
        });
      } else if (result.data.message === "Unbale to Update Status") {
        toast({
          title: result.data.message,
          duration: 2000,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Unknow Error",
        description: "Please Try Again",
        duration: 2000,
        variant: "destructive",
      });
    }
  }

  // delete function Handler
  async function deleteHandler(lead: any) {
    try {
      setIsDeleting(true);
      const res = await axios.delete(
        `https://zyle-backend.vercel.app/api/delete-lead/${lead._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (res.data.message == "Lead Deleted Successfully!") {
        queryClient.invalidateQueries({ queryKey: ["getLeads"] });
        setIsDeleting(false);
        toast({
          title: res.data.message,
          description: "Here You Go🚀",
          duration: 2000,
        });
      } else {
        setIsDeleting(false);
        toast({
          title: "Unbale to delete Lead",
          description: "Please Try Again",
          variant: "destructive",
        });
      }
    } catch (error) {
      setIsDeleting(false);
      toast({
        title: "Unknow error happened",
        description: "Please Try Again",
        variant: "destructive",
      });
      console.log(error);
    }
  }

  return (
    <div>
      <Header setIsFormOpen={setIsFormOpen} />
      <main className="overflow-y-auto flex flex-col    h-[90vh] px-8  items-center  pb-28 max-w-full">
        <OverViewCard allLeads={allLeads} />
        <div className="w-full  justify-center lg:justify-start mt-10    flex mx-auto flex-wrap items-center gap-14">
          {isLoading && <CardSkeleton />}
          {allLeads &&
            allLeads.map((lead, i) => (
              <Card
                key={i}
                className="relative  flex flex-col justify-between h-[23rem] w-72 "
              >
                <div className="absolute right-0">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="text-gray-700 dark:text-gray-300" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-32 space-y-2">
                      <Button className="w-full" variant="secondary">
                        Edit
                      </Button>
                      <Button
                        onClick={() => {
                          setIsDeleting(true);
                          deleteHandler(lead);
                        }}
                        className="w-full"
                        variant="destructive"
                      >
                        {isDeleting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            <span>Deleting...</span>
                          </>
                        ) : (
                          <span>Delete</span>
                        )}
                      </Button>
                    </PopoverContent>
                  </Popover>
                </div>
                <CardHeader className=" py-0">
                  <div className="flex items-center gap-2 mt-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm">{lead.name}</p>
                      <div className="flex mt-2 gap-2 ">
                        <Phone className="w-4 h-4" />
                        <p className="text-sm text-blue-700">{lead.phone}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-2 py-0 flex flex-col justify-center items-center">
                  <Button
                    onClick={() => {
                      setMailModal(true);
                      setLeadMail(lead);
                    }}
                    variant="link"
                  >
                    {lead.email}
                  </Button>
                  <Card className="text-sm w-full p-2 relative font-semibold z-10 text-center">
                    <div className="dark:hidden absolute flex items-center justify-center top-[50%] inset-0 right-[50%] translate-x-[50%] -translate-y-[50%] -z-10 bg-green-200/30 px-8 py-6  rounded-xl ">
                      <IndianRupee className="text-gray-200" />
                    </div>
                    <CardHeader className="p-0 pb-1 ">
                      <CardTitle>GST</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 text-sm font-normal ">
                      {lead.gst}
                    </CardContent>
                  </Card>
                  <Card className="text-sm w-full mt-2 p-2 relative font-semibold z-10 text-center">
                    <div className="dark:hidden absolute flex items-center justify-center top-[50%] inset-0 right-[50%] translate-x-[50%] -translate-y-[50%] -z-10 bg-yellow-200/30 px-8 py-6  rounded-xl ">
                      <BookOpen className="text-gray-200" />
                    </div>
                    <CardHeader className="p-0 pb-1 ">
                      <CardTitle>Source</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 text-sm font-normal ">
                      {lead.source}
                    </CardContent>
                  </Card>
                  <Card className="w-full h-[80px] relative text-sm p-2 z-10   mt-2 font-semibold text-center">
                    <div className="dark:hidden absolute flex items-center justify-center top-[50%] inset-0 right-[50%] translate-x-[50%] -translate-y-[50%] -z-10 bg-orange-200/30 px-8 py-6  rounded-xl ">
                      <MapPin className="text-gray-200" />
                    </div>
                    <CardHeader className="p-0 pb-1">
                      <CardTitle>Address</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 text-sm font-normal capitalize">
                      {lead.address.split(",").map((part, index, array) => (
                        <React.Fragment key={index}>
                          {part}
                          {(index + 1) % 2 === 0 &&
                            index !== array.length - 1 && <br />}
                          {index !== array.length - 1 && ","}
                        </React.Fragment>
                      ))}
                    </CardContent>
                  </Card>
                </CardContent>

                <CardFooter className="flex mt-2  justify-center items-center gap-1 ">
                  <Badge
                    variant="outline"
                    className="capitalize bg-green-500 rounded-sm p-1"
                  >
                    {lead.status}
                  </Badge>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Pen className="w-4 h-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px]">
                      <Select
                        defaultValue={lead.status}
                        onValueChange={status =>
                          statusHandler(status, lead._id)
                        }
                      >
                        <SelectTrigger className="w-[160px] mx-auto">
                          <SelectValue placeholder="Choose Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                            <SelectItem value="potential">Potential</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </PopoverContent>
                  </Popover>
                </CardFooter>
              </Card>
            ))}
        </div>
      </main>
      {isFormOpen && <CustomerForm setIsFormOpen={setIsFormOpen} />}
      {mailModal && <MailerForm lead={leadMail} setMailModal={setMailModal} />}
    </div>
  );
}
