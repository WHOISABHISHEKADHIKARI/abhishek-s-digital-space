import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import ImageWithSkeleton from "@/components/image-with-skeleton";

interface SocialProofItem {
  src: string;
  alt: string;
  caption: string;
}

interface SocialProofGalleryProps {
  items: SocialProofItem[];
  initialCount?: number;
}

const VISIBLE = 6;

const gallerySpring = { type: "spring" as const, stiffness: 260, damping: 26 };

export default function SocialProofGallery({
  items,
  initialCount = VISIBLE,
}: SocialProofGalleryProps) {
  const [visible, setVisible] = useState(initialCount);
  const prefersReducedMotion = useReducedMotion();
  const showMore = visible < items.length;

  return (
    <section aria-label="Social proof — sessions, workshops &amp; community highlights" className="mt-6 w-full max-w-5xl mx-auto px-4">
      <div className="mb-3 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Social Proof Highlights</h2>
        <p className="mt-0.5 text-xs text-muted-foreground uppercase tracking-widest">Sessions · Workshops · Community</p>
      </div>

      <ul className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-1.5 list-none p-0">
        {items.slice(0, visible).map((item, index) => (
          <motion.li
            key={item.src}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, delay: (index % 12) * 0.03, ...gallerySpring }}
            className="group relative aspect-[3/4] overflow-hidden rounded-[4px] bg-muted border border-border/40 hover:border-primary/50 transition-all"
          >
            <ImageWithSkeleton
              src={item.src}
              alt={item.alt}
              width={240}
              height={320}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              wrapperClassName="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-1.5">
              <p className="text-[8px] font-semibold leading-tight text-foreground">{item.caption}</p>
            </div>
          </motion.li>
        ))}
      </ul>

      {showMore && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible(items.length)}
            className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold uppercase tracking-widest border border-border rounded-full hover:bg-muted active:scale-[0.97] transition-all duration-200"
          >
            Show more <ChevronDown size={14} />
          </button>
        </div>
      )}
    </section>
  );
}
