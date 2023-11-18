import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ blob: { maxFileSize: "64MB" } }).onUploadComplete(
    async ({ file }) => {
      console.log("Upload complete");
    }
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
