import React from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

// Section 28 NEXT : pour créer des composants on ajoute à la racine de notre dossier un dossier components et on ajoute comme d'habitude nos composants (ici la navbar)
// on les renomme aussi avec une majuscule

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <a>Accueil</a>
      </Link>
      <Link href="/listes">
        <a>Listes</a>
      </Link>
      {/* // Section 29 NEXT : */}
      <Link href="/blog/article">
        <a> Article de blog</a>
      </Link>
      <Link href="/isr">
        <a> ISR</a>
      </Link>
      <Link href="/cours">
        <a>BTC</a>
      </Link>{" "}
      <Link href="/add">
        <a>Add Post Request</a>
      </Link>
    </nav>
  );
};
export default Navbar;
