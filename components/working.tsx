import { FileUp, MessageSquare, UserPlus } from "lucide-react";

interface StepProps {
  icon: React.ElementType;
  stepNumber: number;
  title: string;
  description: string;
}

const StepCard: React.FC<StepProps> = ({
  icon: Icon,
  stepNumber,
  title,
  description,
}) => (
  <div className="flex flex-col items-center text-center p-6">
    <div className="relative mb-4">
      <div className="flex items-center justify-center w-16 h-16 bg-secondary/10 text-secondary rounded-full">
        <Icon className="w-8 h-8" />
      </div>
      <span className="absolute -top-2 -right-2 flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full font-bold text-sm border-2 border-background">
        {stepNumber}
      </span>
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
);

export const Working = () => {
  const steps: StepProps[] = [
    {
      icon: UserPlus,
      stepNumber: 1,
      title: "Sign Up / Log In",
      description: "Create your secure account or log in to get started.",
    },
    {
      icon: FileUp,
      stepNumber: 2,
      title: "Upload PDF",
      description: "Easily upload your document from your device.",
    },
    {
      icon: MessageSquare,
      stepNumber: 3,
      title: "Start Chatting",
      description:
        "Ask questions and get intelligent answers from your PDF instantly.",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Get Started in 3 Simple Steps
          </h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            Using GemTalk is straightforward and intuitive.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <StepCard key={step.stepNumber} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
};
