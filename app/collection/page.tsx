// collection.tsx
import React from "react";
import Link from "next/link";
import styles from "./collection.module.css";
import { Navigation } from "../components/nav";
import Particles from "../components/particles";
import Particles2 from "../components/particles2";

export default function Collection() {
  return (
    <div className={styles.collectionContainer}>
      <Particles
              className="absolute inset-0 -z-10 "
              quantity={100}/>
              <Particles2 
              className="absolute inset-0 -z-10 "
              quantity={100}></Particles2>
        <Navigation />
      <h1 className={styles.title}>Collection</h1>
      <div className={styles.textBlock}>
        <p>
          See my full CLZ collection below, please reach out if you have any questions regarding those as well.
        </p>
      </div>
      <div className={styles.buttonContainer}>
      <Link
          href="https://cloud.clz.com/crystalcomics/comics"
          className={styles.frostedButton}
          target="_blank" // Opens in a new tab
          rel="noopener noreferrer" // Security best practice
        >
          View Collection Database
        </Link>
      </div>
    </div>
  );
}