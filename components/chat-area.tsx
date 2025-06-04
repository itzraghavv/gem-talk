"use client";

import React, { useRef, useEffect } from "react";
import { ChatMessage, Message } from "./chat-message";
import { MessageInput } from "./message-input";
import { Bot } from "lucide-react";

interface ChatAreaProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  uploadedFileName: string | null;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  onSendMessage,
  isLoading,
  uploadedFileName,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-background rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-semibold text-foreground">
          Chat with AI {uploadedFileName ? `about ${uploadedFileName}` : ""}
        </h2>
      </div>
      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.length === 0 && !isLoading && (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <Bot className="w-16 h-16 mb-4 text-primary/50" />
            <p className="text-lg">Upload a PDF and start chatting!</p>
            <p className="text-sm">
              Ask any questions about the document content.
            </p>
          </div>
        )}
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {isLoading && (
          <div className="flex items-center space-x-2 p-3 rounded-lg bg-card self-start animate-fade-in">
            <Bot className="w-6 h-6 text-primary" />
            <span className="text-sm text-muted-foreground">Bot is typing</span>
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse-dot-1"></div>
              <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse-dot-2"></div>
              <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse-dot-3"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
};
