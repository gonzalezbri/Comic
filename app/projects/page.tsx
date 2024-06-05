import React from "react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import sampleimg from "../../public/SAMPLE.jpg"

// Define sample data for projects
const sampleProjects = [
  { image: sampleimg }, 
  { image: sampleimg },
  { image: sampleimg },

];

export default function ProjectsPage() {
  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl pt-5 font-semi-bold tracking-tight text-zinc-100 sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-zinc-400">
            Project description Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem tempora culpa, ab sint inventore sit? Maxime cumque, sunt quidem aliquid aperiam, modi unde maiores quas doloribus esse rem sapiente corporis!.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
          {sampleProjects.map(() => (
            <Card >
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
