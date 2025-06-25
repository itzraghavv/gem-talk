"use client";

import { useEffect, useState } from "react";
import { ChatArea } from "./chat-area";
import { PdfUpload } from "./pdf-upload";
import { toast } from "@/components/ui/sonner";
import { Message } from "./chat-message";
import { DashboardHeader } from "./dashboard-header";
import { ChatHistoryPanel, ChatSession } from "./chat-history";
import axios from "axios";

export const Dashboard = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
  const [isHistoryPanelOpen, setIsHistoryPanelOpen] = useState(false);

  const handleFileSelect = (file: File) => {
    if (file.type !== "application/pdf") {
      toast.error("Invalid file type");
      return;
    }

    setUploadedFile(file);
    setMessages([]);
    toast.success("PDF uploaded successfully!");
  };

  const clearFile = () => {
    setUploadedFile(null);
    setMessages([]);
    toast.success("Cleared the File");
  };

  const handleSendMessage = async (text: string) => {
    if (!uploadedFile) {
      toast.error("No pdf uploaded", {
        description: "Please Upload a PDF",
      });
      return;
    }

    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      text,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const res = await axios.post("/api/chat", {
        filePath: uploadedFile.name,
        question: text,
      });

      const aiResponse: Message = res.data.response;

      const finalMessages = [...updatedMessages, aiResponse];
      setMessages(finalMessages);
    } catch (err) {
      toast.error("Failed to load response from AI");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (messages.length === 0 && !isLoading) {
      const welcomeMessage: Message = {
        id: `ai-welcome-${Date.now()}`,
        text: "Hello! I'm your GemChat. Upload a PDF document, and I'll help you with its content.",
        sender: "ai",
        timestamp: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  useEffect(() => {
    async function getChatHistory() {
      try {
        const res = await axios.get("/api/chat/history");
        setChatHistory(res.data);
        console.log("res.data");
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getChatHistory();
  }, []);

  return (
    <>
      <DashboardHeader setIsHistoryPanelOpen={setIsHistoryPanelOpen} />
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 min-h-0">
        <aside className="lg:col-span-1 h-auto lg:h-full">
          <PdfUpload
            onFileSelect={handleFileSelect}
            uploadedFile={uploadedFile}
            clearFile={clearFile}
          />
        </aside>
        <section className="h-screen flex flex-col lg:col-span-2 lg:h-full min-h-0">
          <ChatArea
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            uploadedFileName={uploadedFile?.name || null}
          />
        </section>
      </main>
      <ChatHistoryPanel
        isOpen={isHistoryPanelOpen}
        onOpenChange={setIsHistoryPanelOpen}
        chatHistory={chatHistory}
      />
    </>
  );
};
