"use client";

import React, { useState, useCallback } from "react";
import { UploadCloud, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui button
import { toast } from "sonner";
import { uploadPdf } from "@/lib/upload-pdf";

interface PdfUploadProps {
  onFileSelect: (file: File) => void;
  uploadedFile: File | null;
  clearFile: () => void;
}

export const PdfUpload: React.FC<PdfUploadProps> = ({
  onFileSelect,
  uploadedFile,
  clearFile,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type !== "application/pdf") {
        toast("Invalid file type. Please upload a PDF.");
        return;
      }

      onFileSelect(file);

      try {
        await uploadPdf(file);
        toast.success("PDF uploaded successfully to Supabase!");
      } catch (error) {
        console.error("Upload failed", error);
        toast.error("Failed to upload PDF.");
      }
    }
  };

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);
      if (event.dataTransfer.files && event.dataTransfer.files[0]) {
        if (event.dataTransfer.files[0].type === "application/pdf") {
          onFileSelect(event.dataTransfer.files[0]);
        } else {
          // TODO: Show a toast message for invalid file type
          toast("Invalid file type. Please upload a PDF.");
        }
      }
    },
    [onFileSelect]
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
    },
    []
  );

  const handleDragEnter = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(true);
    },
    []
  );

  const handleDragLeave = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);
    },
    []
  );

  return (
    <div className="p-6 bg-card rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Upload PDF</h2>
      {!uploadedFile ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-md p-8 text-center transition-colors duration-200 ease-in-out
            ${
              isDragging
                ? "border-accent bg-accent/10"
                : "border-border hover:border-primary/50"
            }`}
        >
          <UploadCloud className="mx-auto size-12 text-muted-foreground mb-3" />
          <p className="mb-2 text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Click to upload</span>{" "}
            or drag and drop
          </p>
          <p className="text-xs text-muted-foreground">PDF only </p>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".pdf"
            onChange={handleFileChange}
          />
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            Select PDF
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between p-4 bg-muted rounded-md animate-fade-in">
          <div className="flex items-center space-x-3">
            <FileText className="size-8 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground truncate max-w-xs">
                {uploadedFile.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={clearFile}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};
