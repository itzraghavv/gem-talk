import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Message } from "@/components/chat-message";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Trash2 } from "lucide-react";

export interface ChatSession {
  id: string;
  title: string;
  timestamp: string;
  messages: Message[];
  pdfName: string | null;
  firstQuestion?: string;
}

interface ChatHistoryPanelProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  chatHistory?: ChatSession[];
  onLoadChat?: (sessionId: string) => void;
  onDeleteChat?: (sessionId: string) => void;
}

export const ChatHistoryPanel: React.FC<ChatHistoryPanelProps> = ({
  isOpen,
  onOpenChange,
  chatHistory,
  onLoadChat,
  onDeleteChat,
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-[300px] sm:w-[400px] flex flex-col p-0"
      >
        <SheetHeader className="p-6 pb-4 border-b border-border">
          <SheetTitle className="text-primary-accent">Chat History</SheetTitle>
          <SheetDescription>Review your past conversations.</SheetDescription>
        </SheetHeader>
        <ScrollArea className="flex-grow">
          <div className="p-6 space-y-3">
            {chatHistory?.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-10">
                No chat history yet. Start a new chat!
              </p>
            )}

            <div className="p-3 rounded-md border border-border hover:bg-muted/50 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-sm text-foreground truncate group-hover:text-primary-accent">
                    Chat Session
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    <span className="flex items-center">
                      <FileText className="size-3 mr-1" />
                    </span>
                    General Chat
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    date here
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive/80"
                  aria-label="Delete chat"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="p-6 border-t border-border">
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Close Panel
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};
