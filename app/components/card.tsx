// components/Card.tsx
"use client";
import Image from "next/image";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useCallback } from "react";

interface CardProps {
  image: string;
  title: string;
  genre: string;
  grade: string;
  description: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  image,
  title,
  genre,
  grade,
  description,
  onClick,
}) => {
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

  const onMouseMove = useCallback(({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }, [mouseX, mouseY]);

  const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        onClick={onClick}
      >
        <div
          className="overflow-hidden relative duration-300 rounded-xl hover:bg-zinc-100/20 group hover:border-zinc-200/50 border-zinc-600"
          onMouseMove={onMouseMove}
        >
          <div className="relative w-full aspect-[2/3]"> {/* Fixed aspect ratio */}
            <Image
              src={image}
              alt={title}
              layout="fill" // Reverted to fill for proper scaling
              className="rounded-xl object-cover"
            />
          </div>
          <div className="absolute inset-0 z-0 transition duration-300 [mask-image:linear-gradient(black,transparent)]" />
          <motion.div
            className="absolute inset-0 z-10 bg-gradient-to-br opacity-80 via-zinc-100/10 transition duration-300 group-hover:opacity-40"
            style={style}
          />
          <motion.div
            className="absolute inset-0 z-10 opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-80"
            style={style}
          />
          <div className="relative z-20 p-4 bg-gradient-to-t from-black/70 to-transparent">
            <h2 className="text-xl text-white font-semibold">{title}</h2>
            <p className="text-lg text-white">{genre}</p>
            <p className="text-md text-white">Grade: {grade}</p>
            <p className="text-sm text-white line-clamp-2">{description}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};