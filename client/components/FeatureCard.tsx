import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative card-elevated dark:bg-card/80 dark:border-border/40 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-primary/5 p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]">
      {/* Light mode: Gradient overlay on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-accent-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:bg-gradient-to-br dark:from-primary/5 dark:to-transparent" />
      
      {/* Floating animation for icon */}
      <div className="relative z-10">
        <div className="h-12 w-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4 group-hover:animate-pulse transition-all duration-300 group-hover:bg-primary/20 dark:group-hover:bg-primary/30">
          <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
        </div>
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
      
      {/* Shimmer effect on hover - different for light/dark */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent bg-[length:200%_100%] animate-shimmer" />
    </div>
  );
}
