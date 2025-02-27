"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { ComicModal } from "../components/comicmodal";
import comic1 from "../../public/comic1.jpg";
import comic2 from "../../public/comic2.jpg";
import comic3 from "../../public/comic3.jpg";
import comic4 from "../../public/comic4.jpg";
import comic5 from "../../public/comic5.jpg";
import comic6 from "../../public/comic6.jpg";

const sampleProjects = [
  {
    image: comic1.src,
    title: "Marvel Comics",
    genre: "Action",
    grade: "A",
    description: "An epic tale of heroes and villains battling for justice.",
  },
  {
    image: comic2.src,
    title: "The Amazing Spider Man",
    genre: "Fantasy",
    grade: "B+",
    description: "A journey through magical lands filled with wonder.",
  },
  {
    image: comic3.src,
    title: "The Avengers",
    genre: "Sci-Fi",
    grade: "A-",
    description: "A dystopian adventure in a high-tech world.",
  },
  {
    image: comic4.src,
    title: "Spiderman",
    genre: "Action",
    grade: "B",
    description: "A gritty tale of crime and investigation.",
  },
  {
    image: comic5.src,
    title: "The Incredible Hulk",
    genre: "Super Hero",
    grade: "A",
    description: "Hilarious misadventures of a quirky crew.",
  },
  {
    image: comic6.src,
    title: "Bat Man",
    genre: "Super Hero",
    grade: "B+",
    description: "A chilling story of ghosts and secrets.",
  },
];

export default function ProjectsPage() {
  const searchParams = useSearchParams();
  const [selectedComic, setSelectedComic] = useState<number | null>(null);

  // Set selectedComic based on query parameter on initial load
  useEffect(() => {
    const comicIndex = searchParams.get("comic");
    if (comicIndex !== null) {
      const index = parseInt(comicIndex, 10);
      if (!isNaN(index) && index >= 0 && index < sampleProjects.length) {
        setSelectedComic(index);
      }
    }
  }, [searchParams]);

  // Memoize the grid to prevent unnecessary re-renders
  const comicGrid = useMemo(() => (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-8">
      {sampleProjects.map((project, index) => (
        <Card
          key={index}
          image={project.image}
          title={project.title}
          genre={project.genre}
          grade={project.grade}
          description={project.description}
          onClick={() => setSelectedComic(index)}
        />
      ))}
    </div>
  ), []);

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl pt-5 font-display font-semibold tracking-tight text-zinc-100 sm:text-4xl">
            Featured Comics
          </h2>
          <p className="mt-4 text-zinc-400">
            Explore my featured collection of comics!
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />
        {comicGrid}
      </div>
      {selectedComic !== null && (
        <ComicModal
          image={sampleProjects[selectedComic].image}
          title={sampleProjects[selectedComic].title}
          genre={sampleProjects[selectedComic].genre}
          grade={sampleProjects[selectedComic].grade}
          description={sampleProjects[selectedComic].description}
          onClose={() => setSelectedComic(null)}
        />
      )}
    </div>
  );
}