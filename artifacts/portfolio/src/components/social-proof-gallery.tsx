import { useReducedMotion } from "motion/react";
import ImageWithSkeleton from "@/components/image-with-skeleton";

interface SocialProofItem {
  src: string;
  alt: string;
  caption?: string;
}

interface SocialProofGalleryProps {
  items: SocialProofItem[];
}

const TILE_CLASS = "w-[210px]";

export default function SocialProofGallery({ items }: SocialProofGalleryProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <section
        aria-label="Social proof — sessions, workshops and community highlights"
        className="mt-6 w-full max-w-5xl mx-auto px-4"
      >
        <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1.5 list-none p-0">
          {items.map((item) => (
            <li
              key={item.src}
              className="relative aspect-[3/4] overflow-hidden rounded-[4px] bg-muted border border-border/40"
            >
              <ImageWithSkeleton
                src={item.src}
                alt={item.alt}
                width={210}
                height={280}
                loading="lazy"
                className="w-full h-full object-cover"
                wrapperClassName="w-full h-full"
              />
            </li>
          ))}
        </ul>
      </section>
    );
  }

  const loopItems = [...items, ...items];

  return (
    <section
      aria-label="Social proof — sessions, workshops and community highlights"
      className="mt-6 w-screen relative left-1/2 -translate-x-1/2 overflow-hidden border-y border-border/40 bg-muted/30 py-1 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
    >
      <div className="marquee-track flex w-max">
        {loopItems.map((item, index) => (
          <div
            key={`${item.src}-${index}`}
            className={`relative ${TILE_CLASS} aspect-[3/4] shrink-0 overflow-hidden rounded-[4px] bg-muted border border-border/40`}
          >
            <ImageWithSkeleton
              src={item.src}
              alt={item.alt}
              width={210}
              height={280}
              loading="lazy"
              className="w-full h-full object-cover"
              wrapperClassName="w-full h-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
