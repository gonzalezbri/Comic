"use client";
import { Mail, Instagram, Twitter } from "lucide-react";
import { Navigation } from "../components/nav";
import { ContactCard } from "../components/contactCard";
import Particles from "../components/particles";
import Particles2 from "../components/particles2";

const socials = [
    
    {
        icon: <Mail size={25} />,
        href: "mailto:dev@.com",
        label: "Email Me! ",
        handle: "contact@placeholder.com",
    },
    {
        icon: <Instagram size={25} />,
        href: "",
        label: "DM me on Instagram",
        handle: "Instagram",
    },
    {
        icon: <Twitter size={25}/>,
        href: "",
        label: 'Tweet at me !',
        handle: 'Twitter',
    },
];

export default function Contact() {
    return (
        <div className="bg-gradient-to-b from-black via-zinc-200/20 to-black">
            <Particles
        className="absolute inset-0 -z-10 "
        quantity={100}/>
        <Particles2 
        className="absolute inset-0 -z-10 "
        quantity={100}></Particles2>
            <Navigation />
            <div className="container flex items-center justify-center min-h-screen px-24 mx-auto ">
                <div className="grid w-full grid-cols-1 gap-20 mx-auto mt-32 sm:mt-0 sm:grid-cols-3 lg:gap-16 ">
                    {socials.map((social, index) => (
                        <ContactCard key={index} social={social} />
                    ))}
                </div>
            </div>
        </div>
    );
}

