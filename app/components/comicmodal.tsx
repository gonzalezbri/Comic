// components/ComicModal.tsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

interface ComicModalProps {
  image: string;
  title: string;
  genre: string;
  grade: string;
  description: string;
  onClose: () => void;
}

export const ComicModal: React.FC<ComicModalProps> = ({
  image,
  title,
  genre,
  grade,
  description,
  onClose,
}) => {
  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <motion.div
          className="relative bg-zinc-900/90 p-6 rounded-xl shadow-xl max-w-full sm:max-w-[500px] w-[90%] max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors duration-200 z-20"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full aspect-[2/3] mb-4"> {/* Fixed aspect ratio */}
            <Image
              src={image}
              alt={title}
              layout="fill"
              className="rounded-md object-cover"
              priority={true}
            />
          </div>
          <div className="text-white space-y-2">
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="text-md">Genre: {genre}</p>
            <p className="text-md">Grade: {grade}</p>
            <p className="text-sm">{description}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};