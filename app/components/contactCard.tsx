"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Social {
  icon: JSX.Element;
  href: string;
  label: string;
  handle: string;
}

interface ContactCardProps {
  social: Social;
}

export const ContactCard: React.FC<ContactCardProps> = ({ social }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{
          scale: 1.05, // Subtle lift
          backgroundColor: "rgba(255, 255, 255, 0.05)", // Gentle highlight
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }} // Snappy spring
        className="relative border border-zinc-700 rounded-xl bg-zinc-900/50"
      >
        <a
          href={social.href}
          target="_blank"
          className="p-4 flex flex-col items-center gap-4 md:gap-8 md:py-24 lg:pb-48 md:p-16"
        >
          <span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-300 border rounded-full text-zinc-200 hover:text-white hover:bg-zinc-800 border-zinc-500 bg-zinc-900">
            {social.icon}
          </span>
          <div className="z-10 flex flex-col items-center">
            <span className="lg:text-xl font-medium duration-300 xl:text-3xl text-zinc-100 hover:text-white font-display tracking-wide">
              {social.handle}
            </span>
            <span className="mt-4 text-sm text-center duration-300 text-zinc-200 hover:text-zinc-100">
              {social.label}
            </span>
          </div>
        </a>
      </motion.div>
    </AnimatePresence>
  );
};