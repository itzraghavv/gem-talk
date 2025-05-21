import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10 w-full">
      <div className="container text-center max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Chat With Your <span className="text-primary">Documents</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10">
          Upload a PDF and get intelligent answers instantly. GemTalk makes
          understanding complex documents simple and fast.
        </p>
        <Link href={"/dashboard"}>
          <Button className="font-semibold">
            Get Started <ArrowRight className="ml-2 size-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
};
