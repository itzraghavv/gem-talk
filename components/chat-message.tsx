import { Bot, User } from "lucide-react";
import React from "react";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: string;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <div
      className={`flex animate-fade-in mb-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex items-end max-w-[80%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {isUser ? (
          <div className="flex-shrink-0 ml-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <User className="size-5" />
          </div>
        ) : (
          <div className="flex-shrink-0 mr-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-foreground">
            <Bot className="size-5 text-primary" />
          </div>
        )}
        <div
          className={`px-4 py-3 rounded-lg shadow-md ${
            isUser
              ? "bg-primary text-primary-foreground font-medium rounded-br-none"
              : "bg-card font-medium text-foreground rounded-bl-none"
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
          <p
            className={`text-xs mt-1 ${
              isUser ? "text-primary-foreground/70" : "text-muted-foreground"
            }`}
          >
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};
