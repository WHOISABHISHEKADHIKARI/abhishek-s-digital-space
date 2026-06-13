import { useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ImagePreviewProps {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
}

export default function ImagePreview({ src, alt, open, onClose }: ImagePreviewProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-preview flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          style={{ willChange: "opacity" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.12 } }}
            transition={{ duration: 0.2 }}
            style={{ willChange: "transform, opacity" }}
            className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={onClose}
          >
            <button
              onClick={onClose}
              className="absolute -top-10 right-0 text-white/80 hover:text-white transition-colors z-10"
              aria-label="Close preview"
            >
              <X size={24} />
            </button>
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
