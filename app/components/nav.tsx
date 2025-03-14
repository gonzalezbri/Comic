"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export const Navigation: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <header ref={ref}>
      <div
        className={`fixed border-b-2 border-white shadow-[0_0_15px_2px_rgba(255,255,255,0.8)] inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b pt-8 pr-10 ${
          isIntersecting
            ? "bg-zinc-900/0 border-transparent"
            : "bg-zinc-900/500 border-zinc-800"
        }`}
      >
        <div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
          <nav className="flex items-center gap-10">
            <Link
              href="/contact"
              className="duration-200 text-zinc-400 hover:text-red-400 text-lg font-medium"
            >
              Contact
            </Link>
            <Link
              href="/collection"
              className="duration-200 text-zinc-400 hover:text-red-400 text-lg font-medium"
            >
              Collection
            </Link>
            <Link
              href="/comics"
              className="duration-200 text-zinc-400 hover:text-red-400 text-lg font-medium pr-6"
            >
              Featured
            </Link>
          </nav>

          <Link
            href="/"
            className="duration-200 text-zinc-300 hover:text-zinc-100 flex items-center pl-8 md:pl-6"
          >
            <ArrowLeft className="w-10 h-10" />
          </Link>
        </div>
      </div>
    </header>
  );
};