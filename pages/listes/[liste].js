import react from "react";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

const Liste = (props) => {
  console.log(props);

  {
    /* on utilise useRouter pour afficher dynamiquement le slug en h1  */
  }
  {
    /* pour cela, on l'importe et on le déclare */
  }

  const router = useRouter();

  if (!props.listeEnCours) {
    return <h1>chargement</h1>;
  }

  return (
    <div className="container">
      {/* puis on l'utilise via router.query.slug */}
      <h1 className={styles.titre}>
        {router.query.liste.charAt(0).toUpperCase() +
          router.query.liste.slice(1)}
      </h1>
      <table className={styles.tableau}>
        <tbody>
          {props.listeEnCours.map((elem, index) => (
            // On n'a pas besoin ici d'utiliser des accolades si on utilise pas de return

            <tr key={index}>
              <td>{elem.en}</td>
              <td>{elem.fr}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Liste;

// 2) GETSTATICPROPS
// ici on utilise getsstaticpath, on doit donc ajouter un argument context à getStaticProps :
export async function getStaticProps(context) {
  // ici context.params.liste correspond au chemin défini par le nom de notre chemin dynamique : [liste].js
  const slug = context.params.liste;
  // les données affichées seront loggées sur le terminal et non le navigateur :
  console.log(slug, "<<<< slug");
  const data = await import("../../data/listes.json");

  // si le nom est égale au slug, alors on le retourne via find (en sachant que le reste sera en 404, vu que l'on fallback:false)
  const listeEnCours = data.englishList.find((list) => list.name === slug);

  // si dans le cas précis ou on a fallback à true, mais que l'on arrive sur une page qui n'existe pas, il faut pouvoir la rediriger par exemple vers une 404 comme vu précédemment
  if (!listeEnCours) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      listeEnCours: listeEnCours.data,
    },
  };
}

// 1) GETSTATICPATHS : ici on a une multitude de pages, comme ici on ne sait pas combien de pages on doit créer, on va utiliser getstaticPaths, pour générer des pages dynamiquement
// La règle : dès qu'il y a des chemins dynamiques, on doit utiliser getStaticPaths et getStaticProps :
// Il permet de donner à next le nombre de chemins que j'ai pour le nombre de pages que j'ai envie d'avoir

export async function getStaticPaths() {
  const data = await import("../../data/listes.json");

  // afin de retourner dynamiquement toutes les pages, on vient récupérer tous les chemins concernés :
  // liste est le nom du slug ici
  const paths = data.englishList.map((item) => ({
    params: { liste: item.name },
  }));

  return {
    // A ) méthode pour un seul chemin:
    // le nom "liste" doit tout le temps etre le nom de notre chemin dynamique [liste].js
    // il doit etre exactement le même
    // paths: [
    //   {
    //     // ici on a une page statique créée avecc le nom /words. On peut imaginer que l'on a des pages statiques pleine de données pour ces pages qui seraient les plus performantes et que pour les autres, on aura d'abord la structure puis le contenu (chargement en 2 temps avec la structure html puis les données qui vont les peupler => isloading)

    //     params: { liste: "words" },
    //     // params: { liste: "adjectives" },
    //     params: { liste: "verbs" },
    //   },
    // ],

    // B ) méthode pour des chemins dynamiques :
    paths,

    // ici fallback permet de préciser que si on a un chemin qui n'est pas défini ici (comme words), on aura une 404
    fallback: false,
    // on peut passer le fallback à true, notamment pour des pages qui ont peu de vues ou peu d'utilisateur, comme l'affichage se fait dans ce cas en 2 temps pour adjective, que l'on a retiré, il faudra donc ajouter un isloading
    // fallback: true,

    // une autre manière de faire coté serveur de faire via blocking, ici tout se fera côté serveur mais ce sera donc beaucoup plus lent.
    // on met habituellement fallback:false, dans quelques cas fallback:true
    // fallback: true,
  };
}
