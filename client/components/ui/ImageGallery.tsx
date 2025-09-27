import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
    width: number;
    height: number;
    title?: string;
    description?: string;
    category?: string;
  }[];
  className?: string;
}

export function ImageGallery({ images, className }: ImageGalleryProps) {
  return (
    <div
      className={cn(
        "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {images.map((image, index) => (
        <article
          key={index}
          className="group relative overflow-hidden rounded-3xl bg-card shadow-lg ring-1 ring-border/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
          <div className="relative z-10 px-6 pb-6 pt-5 space-y-3">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary/90">
              {image.category ?? `Project ${index + 1}`}
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              {image.title ?? image.alt}
            </h3>
            <p className="text-sm text-muted-foreground">
              {image.description ?? "Showcasing impactful digital experiences tailored to our clients' goals."}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
