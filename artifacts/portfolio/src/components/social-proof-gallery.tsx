import { motion, useReducedMotion } from "motion/react";
import ImageWithSkeleton from "@/components/image-with-skeleton";

interface SocialProofItem {
  src: string;
  alt: string;
  caption?: string;
}

interface SocialProofGalleryProps {
  items: SocialProofItem[];
}

const TILE_WIDTH = 210;

const gallerySpring = {
  type: "spring" as const,
  stiffness: 260,
  damping: 26,
};

export default function SocialProofGallery({ items }: SocialProofGalleryProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion === null) {
    return (
      <section
        aria-label="Social proof — sessions, workshops and community highlights"
        className="mt-6 w-full max-w-5xl mx-auto px-4"
      >
        <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-1.5 list-none p-0">
          {items.map((item) => (
            <li
              key={item.src}
              className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-muted border border-border/40"
            >
              <ImageWithSkeleton
                src={item.src}
                alt={item.alt}
                width={TILE_WIDTH}
                height={Math.round(TILE_WIDTH * 5 / 4)}
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
              className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-muted border border-border/40"
            >
              <ImageWithSkeleton
                src={item.src}
                alt={item.alt}
                width={TILE_WIDTH}
                height={Math.round(TILE_WIDTH * 5 / 4)}
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

  return (
    <section
      aria-label="Social proof — sessions, workshops and community highlights"
      className="mt-6 w-screen relative left-1/2 -translate-x-1/2 overflow-hidden border-y border-border/40 bg-muted/30 py-1"
    >
      <div className="marquee-track flex w-max gap-2 px-2">
        {items.length > 0 && [...items, ...items].map((item, index) => (
          <motion.li
            key={`${item.src}-${index % items.length}`}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, delay: (index % items.length) * 0.03, ...gallerySpring }}
            className="relative w-[210px] aspect-[3/4] overflow-hidden rounded-[4px] bg-muted border border-border/40"
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
          </motion.li>
        ))}
      </div>
    </section>
  );
}
