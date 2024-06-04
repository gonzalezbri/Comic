import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
import Particles2 from "./components/particles2";

const navigation = [
  { name: "Enter", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-b from-white via-zinc-200/20 to-black">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-display duration-500 text-white hover:text-red-400 "
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <Particles2 
      className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}></Particles2>

      <h1 className="z-10 text-4xl text-transparent duration-1000 bg-zinc-400 cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
        DoomsDayPoptart
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-sm font-display text-white ">
          I'm Cano i dj.
        </h2>
      </div>
    </div>
  );

}
