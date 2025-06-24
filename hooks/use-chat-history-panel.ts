import { useState } from "react";
import { Message } from "@/components/chat-message";
import { ChatSession } from "@/components/chat-history";

export const useChatHistory = () => {
  const [chatHistory, setChatHistory] = useState<ChatSession[]>(() => {
    const savedHistory = localStorage.getItem("pdfChatHistory");
    if (savedHistory) {
      try {
        return JSON.parse(savedHistory);
      } catch (e) {
        console.error("Failed to parse chat history from localStorage", e);
        return [];
      }
    }
    return [];
  });

  const saveChatToHistory = (
    currentMessages: Message[],
    currentFile: File | null,
    currentChatId: string | null,
    setCurrentChatId: (id: string | null) => void
  ) => {
    if (currentMessages.length <= 1 && currentMessages[0]?.sender === "ai")
      return;

    const existingChatIndex = chatHistory.findIndex(
      (chat) => chat.id === currentChatId
    );
    let newHistory: ChatSession[];

    const chatSessionData: Omit<ChatSession, "id" | "timestamp"> = {
      title: currentFile?.name || `Chat on ${new Date().toLocaleDateString()}`,
      messages: currentMessages,
      pdfName: currentFile?.name || null,
      firstQuestion:
        currentMessages
          .find((m) => m.sender === "user")
          ?.text.substring(0, 50) || "Untitled Chat",
    };

    if (existingChatIndex > -1) {
      newHistory = chatHistory.map((chat, index) =>
        index === existingChatIndex
          ? {
              ...chat,
              ...chatSessionData,
              messages: currentMessages,
              timestamp: new Date().toISOString(),
            }
          : chat
      );
    } else {
      const newChatId = `chat-${Date.now()}`;
      const newChatSession: ChatSession = {
        ...chatSessionData,
        id: newChatId,
        timestamp: new Date().toISOString(),
      };
      newHistory = [newChatSession, ...chatHistory];
      setCurrentChatId(newChatId);
    }

    setChatHistory(newHistory);
    localStorage.setItem("pdfChatHistory", JSON.stringify(newHistory));
  };

  const deleteChatFromHistory = (
    sessionId: string,
    currentChatId: string | null,
    clearFile: () => void
  ) => {
    const updatedHistory = chatHistory.filter(
      (session) => session.id !== sessionId
    );
    setChatHistory(updatedHistory);
    localStorage.setItem("pdfChatHistory", JSON.stringify(updatedHistory));

    if (currentChatId === sessionId) {
      clearFile(); 
    }
  };

  const loadChatFromHistory = (
    sessionId: string,
    currentMessages: Message[],
    uploadedFile: File | null,
    setMessages: (messages: Message[]) => void,
    setUploadedFile: (file: File | null) => void,
    setCurrentChatId: (id: string | null) => void,
    setIsHistoryPanelOpen: (open: boolean) => void
  ) => {
    const sessionToLoad = chatHistory.find(
      (session) => session.id === sessionId
    );
    if (sessionToLoad) {
      if (
        currentMessages.length > 1 ||
        (currentMessages.length === 1 && currentMessages[0].sender !== "ai")
      ) {
        saveChatToHistory(
          currentMessages,
          uploadedFile,
          null,
          setCurrentChatId
        );
      }

      setMessages(sessionToLoad.messages);
      if (sessionToLoad.pdfName) {
        setUploadedFile({
          name: sessionToLoad.pdfName,
          type: "application/pdf",
          size: 0,
        } as File);
      } else {
        setUploadedFile(null);
      }

      setCurrentChatId(sessionToLoad.id);
      setIsHistoryPanelOpen(false);
    }
  };

  return {
    chatHistory,
    saveChatToHistory,
    deleteChatFromHistory,
    loadChatFromHistory,
    setChatHistory,
  };
};
