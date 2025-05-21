import React, { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui button
import { Textarea } from "@/components/ui/text-area"; // Assuming shadcn/ui textarea

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  isLoading,
}) => {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText.trim());
      setInputText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border-t border-border bg-card"
    >
      <div className="flex items-center space-x-2">
        <Textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-grow resize-none focus-visible:ring-1 focus-visible:ring-primary-accent"
          rows={1}
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="icon"
          disabled={isLoading || !inputText.trim()}
          className="bg-primary-accent hover:bg-primary-accent/90"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};
