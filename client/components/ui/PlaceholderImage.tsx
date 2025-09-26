import { cn } from "@/lib/utils";

interface PlaceholderImageProps {
  width?: number;
  height?: number;
  className?: string;
  text?: string;
}

export function PlaceholderImage({
  width = 400,
  height = 300,
  className,
  text = "Placeholder",
}: PlaceholderImageProps) {
  const colors = [
    'from-blue-500/10 to-blue-600/10',
    'from-green-500/10 to-green-600/10',
    'from-purple-500/10 to-purple-600/10',
    'from-pink-500/10 to-pink-600/10',
    'from-yellow-500/10 to-yellow-600/10',
  ];
  
  const bgColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div 
      className={cn(
        "relative flex items-center justify-center rounded-xl overflow-hidden",
        "bg-gradient-to-br",
        bgColor,
        className
      )}
      style={{
        width: width,
        height: height,
      }}
    >
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,white)]" />
      <span className="relative z-10 text-muted-foreground/50 text-sm font-medium">
        {text}
      </span>
    </div>
  );
}
