import { Brain, ShieldCheck, UploadCloud, History } from "lucide-react";

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
}) => (
  <div className="bg-card p-6 rounded-lg shadow-sm border border-border/60 hover:shadow-md transition-shadow duration-300">
    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-full mb-4">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
);

export const FeaturesSection = () => {
  const features: FeatureCardProps[] = [
    {
      icon: ShieldCheck,
      title: "Secure Authentication",
      description:
        "Robust and secure login and registration to protect your data.",
    },
    {
      icon: UploadCloud,
      title: "PDF Upload & Parsing",
      description:
        "Easily upload your PDF documents. Our system handles the parsing.",
    },
    {
      icon: Brain,
      title: "AI Chat with Gemini",
      description:
        "Interact with your documents using powerful AI, powered by Gemini.",
    },
    {
      icon: History,
      title: "Saved Chat History",
      description:
        "Keep track of your conversations and refer back to them anytime.",
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Why Choose GemTalk?
          </h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            Unlock the power of your documents with cutting-edge AI technology.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};
