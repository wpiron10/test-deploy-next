import react from "react";

// afin de remplacer la 404 par défaut, on créé un fichier 404.js, que l'on peut personnaliser derriere
// on doit simplement nommer notre fonction autre chose que 404 tout seul, pour éviter que ce soit un nombre

const error404 = () => {
  return (
    <>
      <h1>404 ERROR</h1>
    </>
  );
};
export default error404;
