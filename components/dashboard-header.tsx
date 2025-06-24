import { Archive, Download, Link } from "lucide-react";
import { Button } from "./ui/button";

interface DashboardHeaderProps {
  setIsHistoryPanelOpen: (value: boolean) => void;
}

export const DashboardHeader = ({
  setIsHistoryPanelOpen,
}: DashboardHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl text-primary">GemChat</span>
        </Link>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              setIsHistoryPanelOpen(true);
              console.log("clcick");
            }}
          >
            <Archive className="mr-2 size-4" />
            Chat History
          </Button>
          <Button variant="outline" disabled={false}>
            <Download className="mr-2 size-4" />
            Export Chat
          </Button>
        </div>
      </div>
    </header>
  );
};
