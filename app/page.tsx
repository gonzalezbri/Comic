"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react"; // Added useEffect
import { motion } from "framer-motion";
import Particles from "./components/particles";
import Particles2 from "./components/particles2";
import Carousel from "../app/components/carousel";
import comic1 from "../public/comic1.jpg";
import comic2 from "../public/comic2.jpg";
import comic3 from "../public/comic3.jpg";
import comic4 from "../public/comic4.jpg";
import comic5 from "../public/comic5.jpg";
import comic6 from "../public/comic6.jpg";

const navigation = [
  { name: "Comics", href: "/comics" },
  { name: "Contact", href: "/contact" },
  { name: "Collection", href: "/collection" },
];

// Original comic images with stable IDs
const comicImagesBase = [
  { id: 0, src: comic1.src, link: "/comic1" },
  { id: 1, src: comic2.src, link: "/comic2" },
  { id: 2, src: comic3.src, link: "/comic3" },
  { id: 3, src: comic4.src, link: "/comic4" },
  { id: 4, src: comic5.src, link: "/comic5" },
  { id: 5, src: comic6.src, link: "/comic6" },
];

// Animation variants with spring transitions
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeInSpring = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.5,
    },
  },
};

const fadeLeftSpring = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
      mass: 0.6,
    },
  },
};

const fadeRightSpring = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
      mass: 0.6,
    },
  },
};

const titleSpring = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
      mass: 0.8,
    },
  },
};

export default function Home() {
  // State to hold the shuffled comic images
  const [comicImages, setComicImages] = useState(comicImagesBase);

  // Shuffle on every page load
  useEffect(() => {
    setComicImages([...comicImagesBase].sort(() => Math.random() - 0.5));
  }, []); // Empty dependency array ensures it runs on mount

  return (
    <motion.div
      className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-b from-green-700/40 via-black/40 to-black bg-[url('/space-background.jpg')] bg-cover bg-center bg-fixed animate-hue-cycle"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.nav className="my-16 pt-10" variants={fadeInSpring}>
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-m duration-500 text-white hover:text-red-500">
              {item.name}
            </Link>
          ))}
        </ul>
      </motion.nav>
      <motion.div
        className="hidden w-screen h-px animate-glow md:block bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0"
        variants={fadeLeftSpring}
      />
      <motion.div variants={fadeInSpring}>
        <Particles className="absolute inset-0 -z-10" quantity={100} />
      </motion.div>
      <motion.div variants={fadeInSpring}>
        <Particles2 className="absolute inset-0 -z-10" quantity={100} />
      </motion.div>
      <motion.h1
        className="z-10 text-4xl text-transparent bg-white/90 cursor-default text-edge-outline font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text"
        variants={titleSpring}
      >
        Crystal Comics
      </motion.h1>
      <motion.div
        className="hidden w-screen h-px animate-glow md:block bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0"
        variants={fadeRightSpring}
      />
      <motion.div className="my-10 text-center" variants={fadeInSpring}>
        <h2 className="text-sm text-white">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo ex aut at numquam vero laboriosam in, ipsa alias, reiciendis soluta odit, suscipit autem praesentium. Temporibus nemo quas ratione voluptatum laudantium?
        </h2>
      </motion.div>
      <motion.div className="my-16 w-full max-w-2xl min-h-[375px] mb-8 md:mb-16" variants={fadeInSpring}> {/* Added mb-8 for mobile, md:mb-16 for desktop */}
        <Carousel images={comicImages} />
      </motion.div>
    </motion.div>
  );
}