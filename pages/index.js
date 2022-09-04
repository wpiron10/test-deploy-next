import styles from "../styles/Home.module.css";

import { v4 as uuidv4 } from "uuid";
import Head from "next/head";
import { useState, useEffect } from "react";

export default function Home(props) {
  // console.log(props, "props");

  const [state, setState] = useState(false);

  useEffect(() => {
    newWord();
  }, []);
  const newWord = () => {
    fetch("./api/vocapi")
      .then((response) => response.json())
      .then((data) => setState(data));
  };
  let randomWord;
  if (state) {
    const array = state.englishList[0].data;
    randomWord = array[Math.floor(Math.random() * array.length)].en;
    // console.log(randomWord, "random");
  }

  console.log(state, "state");
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title className={styles.title}>titre</title>
      </Head>
      <h1 className={styles.titre}>Mot au hasard</h1>
      {/* <table className={styles.tableau}>
        <tbody>
          {props.array.map((elem, index) => (
            // On n'a pas besoin ici d'utiliser des accolades si on utilise pas de return

            <tr key={index}>
              <td>{elem.en}</td>
              <td>{elem.fr}</td>
            </tr>
          ))}
        </tbody>
        
      </table> */}
      <button onClick={newWord}>GET RANDOM WORDS</button>
      <h2>{randomWord}</h2>
    </>
  );
}
// GETSTATICPROPS
// afin de pouvoir importer nos données venant d'une API, on doit exporter de manière asynchrone (comme pour un fetch), nos données
// elles doivent obligatoirement etre retourner dans une props:{} que l'on utilisera en argument de notre fonction (comme une props)

export async function getStaticProps() {
  const data = await import("../data/vocabulary.json");
  const array = data.vocabulary;

  // on peut ici envoyer une 404 par exemple, si notre API ne renvoit riene

  // if (array.length === 0) {
  //   return {
  //     notFound: true,
  //   };
  // }

  // mais on peut aussi rediriger vers une autre page en précisant la destination :
  if (array.length === 0) {
    return {
      redirect: true,
      destination: "/isr",
    };
  }
  return {
    props: {
      array,
    },
  };
}
