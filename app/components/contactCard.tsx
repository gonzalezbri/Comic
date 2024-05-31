"use client";
import React from "react";
import { AnimatePresence, motion, useMotionTemplate, useSpring } from "framer-motion";

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
    const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }: any) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
    const style = { maskImage, WebkitMaskImage: maskImage };

    return (
        <AnimatePresence>
		<motion.div
			initial={{ opacity: 0, scale: 0.9, }}
			animate={{ opacity: 1, scale: 1,}}
			exit={{ opacity: 0, scale: 0.9,}}>
        <div
            onMouseMove={onMouseMove}
            className="overflow-hidden backdrop-blur relative duration-700 border border-double border-2 rounded-xl hover:bg-zinc-800/10 group md:gap-8 hover:border-zinc-400/50 border-zinc-600"
        >
            <div className="pointer-events-none">
                <div className="absolute inset-0 z-0  transition duration-1000 [mask-image:linear-gradient(black,transparent)]" />
                <motion.div
                    className="absolute inset-0 z-10  bg-gradient-to-br opacity-100  via-zinc-100/10  transition duration-1000 group-hover:opacity-50 "
                    style={style}
                />
                <motion.div
                    className="absolute inset-0 z-10 opacity-0 mix-blend-overlay transition duration-1000 group-hover:opacity-100"
                    style={style}
                />
            </div>
            <a
                href={social.href}
                target="_blank"
                className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24  lg:pb-48  md:p-16"
            >
                <span
                    className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
                    aria-hidden="true"
                />
                <span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
                    {social.icon}
                </span>{" "}
                <div className="z-10 flex flex-col items-center">
                    <span className="lg:text-xl font-medium duration-150 xl:text-3xl text-zinc-200 group-hover:text-white font-display">
                        {social.handle}
                    </span>
                    <span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
                        {social.label}
                    </span>
                </div>
            </a>
        </div>
        </motion.div>
        </AnimatePresence>
    );
};
