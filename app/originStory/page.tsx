// collection.tsx
import React from "react";
import { Navigation } from "../components/nav";
import Particles from "../components/particles";
import Particles2 from "../components/particles2";

export default function OriginStory() {
  return (
    <div >
      <Particles
              className="absolute inset-0 -z-10 "
              quantity={100}/>
              <Particles2 
              className="absolute inset-0 -z-10 "
              quantity={100}></Particles2>
        <Navigation />
      <h1>Origin Story</h1>
      <div>
        <p>
          Origin Story
        </p>
      </div>

    </div>
  );
}