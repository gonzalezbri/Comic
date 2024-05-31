"use client";
import sampleimg from "../../public/SAMPLE.jpg"
import bunny from "../../public/bunny.jpg"
import Image from "next/image";
import {
	AnimatePresence,
	motion,
	useMotionTemplate,
	useMotionValue,
	useSpring,
} from "framer-motion";

import { MouseEventHandler, PropsWithChildren } from "react";

export const Card: React.FC = () => {
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
			initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
			animate={{ opacity: 1, scale: 1, filter: 'blur(0)' }}
			exit={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}>
				<div className="overflow-hidden relative duration-700 rounded-xl hover:bg-zinc-400/10 group md:gap-8 hover:border-zinc-400/50 border-zinc-600">
					<div className="pointer-events-none relative aspect-w-16 aspect-h-9">
						<Image
							src={bunny}
							alt="Sample"
							layout="responsive"
							objectFit="cover"
							className="rounded-xl"
						/>
					</div>
					<div className="absolute inset-0 z-0 transition duration-1000 [mask-image:linear-gradient(black,transparent)]" />
					<motion.div
						className="absolute inset-0 z-10 bg-gradient-to-br opacity-100 via-zinc-100/10 transition duration-1000 group-hover:opacity-50"
						style={style}
					/>
					<motion.div
						className="absolute inset-0 z-10 opacity-0 mix-blend-overlay transition duration-1000 group-hover:opacity-100"
						style={style}
					/>
					<h2 className="mx-8 py-2 text-xl text-zinc-400 font-bold">Title</h2>
					<p className="mx-8 py-2 text-zinc-400">Description</p>
				</div>
		</motion.div>
		</AnimatePresence>
    );
};
