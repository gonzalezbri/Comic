"use client";
import { Mail, Twitter, Instagram } from "lucide-react";
import { Navigation } from "../components/nav";
import { ContactCard } from "../components/contactCard";
import Particles from "../components/particles";
import Particles2 from "../components/particles2";

const socials = [
    
    {
        icon: <Mail size={20} />,
        href: "mailto:dev@chronark.com",
        label: "Email",
        handle: "contact@Poochkiie.com",
    },
    {
        icon: <Instagram size={20} />,
        href: "https://github.com/chronark",
        label: "Instagram",
        handle: "Poochkiie",
    },
];

export default function Contact() {
    return (
        <div className=" bg-gradient-to-b from-black via-zinc-200/20 to-black">
            <Particles
        className="absolute inset-0 -z-10 "
        quantity={100}/>
        <Particles2 
        className="absolute inset-0 -z-10 "
        quantity={100}></Particles2>
            <Navigation />
            <div className="container flex items-center justify-center min-h-screen px-24 mx-auto">
                <div className="grid w-full grid-cols-1 gap-20 mx-auto mt-32 sm:mt-0 sm:grid-cols-2 lg:gap-16">
                    {socials.map((social, index) => (
                        <ContactCard key={index} social={social} />
                    ))}
                </div>
            </div>
        </div>
    );
}

