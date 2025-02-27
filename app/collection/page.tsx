// collection.tsx
import React from "react";
import Link from "next/link";
import styles from "./collection.module.css"; // We'll create this CSS module
import { Navigation } from "../components/nav";

export default function Collection() {
  return (
    <div className={styles.collectionContainer}>
        <Navigation />
      <h1 className={styles.title}>Collection</h1>
      <div className={styles.textBlock}>
        <p>
          See my full CLZ collection below, please reach out if you have any questions regarding those as well.
        </p>
      </div>
      <div className={styles.buttonContainer}>
        <Link href="https://cloud.clz.com/crystalcomics/comics" className={styles.frostedButton}>
          View Collection Database
        </Link>
      </div>
    </div>
  );
}