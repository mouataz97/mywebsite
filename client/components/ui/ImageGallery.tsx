import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
  className?: string;
}

export function ImageGallery({ images, className }: ImageGalleryProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6", className)}>
      {images.map((image, index) => (
        <div 
          key={index}
          className="group relative overflow-hidden rounded-xl aspect-[4/3] bg-muted/50 hover:bg-muted/30 transition-all duration-300"
        >
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <p className="text-white font-medium text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              {image.alt}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
