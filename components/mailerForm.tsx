"use client";
import React, { useCallback, useState } from "react";
import { Card } from "./ui/card";
import { Loader2, UploadCloud, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import type { FileWithPath } from "@uploadthing/react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { useUploadThing } from "@/lib/utils";

interface UserFile {
  name: string;
  url: string;
}

interface UploadFileResponse {
  name: string;
  url: string;
}
// form schema for contact
const formSchema = z.object({
  mailTo: z.string().email({
    message: "Invalid email address.",
  }),
  subject: z.string().min(6, {
    message: "Minimum 3 characters required",
  }),
  from: z.string().email({
    message: "Invalid email address",
  }),
  message: z.string().nonempty({
    message: "This Field Is Required",
  }),
});

function MailerForm({ lead, setMailModal }: { lead: any; setMailModal: any }) {
  const { toast } = useToast();
  const [userFiles, setUserFiles] = useState<UserFile | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  // initializing the react form hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mailTo: lead.email,
      subject: "Team Zyle",
      message: "",
      from: "teamsupport@zyle.in",
    },
  });

  // uploadthing connector
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  }, []);

  // uploadthing logics
  const { startUpload, permittedFileInfo, isUploading } = useUploadThing(
    "imageUploader",
    {
      onClientUploadComplete: file => {
        if (file?.length !== undefined) {
          const { name, url } = file[0];
          setUserFiles({ name, url });
          setFiles([]);
          toast({
            title: "Upload Completed Successfully",
            description: "Now You Can Send Email 📧",
            duration: 2000,
          });
        }
      },
      onUploadError: () => {
        toast({
          title: "Unable To Upload File ❌",
          description: "Please Try Again 🔄️",
          variant: "destructive",
          duration: 4000,
        });
      },
      onUploadBegin: () => {
        toast({
          title: "File Upload Started ⬆️",
          description: "It Takes Some Time! Please Wait Patiently 🕐",
          duration: 3000,
        });
      },
    }
  );

  // drop zone functions
  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  // form submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const datas = {
        ...values,
        file: { name: userFiles?.name, url: userFiles?.url },
      };

      const req = await axios.post(
        "https://zyle-backend.vercel.app/api/mail",
        datas,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (req.data.message === "Email sent successfully") {
        setIsLoading(false);
        toast({
          title: req.data.message,
          duration: 5000,
        });
        form.reset();
        setMailModal(false);
      } else {
        setIsLoading(false);
        toast({
          title: "Unable to Send Mail",
          description:
            "We Are Facing Promblem With Sending Email.Please Try Again",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast({
        title: "Unknow Error",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="absolute inset-0 backdrop-blur-md flex  items-center z-50 justify-center">
      <Card className="max-w-lg relative mx-auto w-full p-4">
        <Button
          variant="ghost"
          className="absolute border-0 rounded-full top-0 right-0"
          onClick={prev => setMailModal(!prev)}
        >
          <X className="hover:scale-105 duration-300 transition-all" />
        </Button>
        <div className="max-w-md mx-auto py-4">
          <h4 className="text-center text-2xl font-bold text-transparent bg-gradient-to-r from-[#ec008c] to-[#fc6767]  bg-clip-text">
            Email Sender
          </h4>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="jhon doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="jhon@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mailTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="jhon@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Message</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={6}
                        {...field}
                        placeholder="Write Your Message Here..."
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Card
                className="h-24  flex flex-col items-center justify-center"
                {...getRootProps()}
              >
                <Input {...getInputProps()} />

                <UploadCloud className="w-14 h-14  " />
                <p className="text-sm">Drop Your Files Here</p>
              </Card>
              <div>
                {files.length > 0 && (
                  <Button
                    disabled={isUploading}
                    size="sm"
                    className="disabled:cursor-not-allowed"
                    variant={isUploading ? "outline" : "default"}
                    onClick={() => startUpload(files)}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <span> Upload {files.length} files</span>
                    )}
                  </Button>
                )}
              </div>

              <Button
                type="submit"
                className="w-full disabled:cursor-not-allowed  "
                disabled={isLoading || isUploading || files.length > 0}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send Mail</span>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
}

export default MailerForm;
