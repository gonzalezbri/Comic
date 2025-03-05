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
import logo from "../public/Option3web.webp"

const navigation = [
  { name: "Featured", href: "/comics" },
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
      className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-b from-zinc-900/20 via-black/10 to-black bg-cover bg-center bg-fixed"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.nav
        className="my-4 pt-8 -mt-2 md:mt-0" // Added -mt-2 for mobile, reset to 0 on md
        variants={fadeInSpring}
      >
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-m md:text-xl duration-500 text-white hover:text-red-500"
            >
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
      <motion.div
        className="z-10 cursor-default font-display flex items-center justify-center animate-hue-cycle -mt-2 md:mt-0" // Added -mt-2 for mobile, reset to 0 on md
        variants={titleSpring}
      >
        <img 
          src={logo.src}
          alt="Crystal Comics Logo"
          className="w-[24rem] sm:w-[32rem] md:w-[40rem] h-auto" // Increased base sizes, adjust as needed
        />
      </motion.div>
      <motion.div
        className="hidden w-screen h-px animate-glow md:block bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0"
        variants={fadeRightSpring}
      />
      <motion.div className=" w-full max-w-2xl min-h-[375px] mb-4 md:mb-8" variants={fadeInSpring}> {/* Added mb-8 for mobile, md:mb-16 for desktop */}
        <Carousel images={comicImages} />
      </motion.div>
    </motion.div>
  );
}