import React from "react";
import Navbar from "../Navbar/Navbar";

// pour créer une navbar sur plusieurs pages, on créé un composant que l'on viendra importer dans _app.js, il contient notre navbar, et le contenu de l'app (la props children), étant donné que cest un composant parent

const Container = ({ children }) => {
  return (
    <>
      <Navbar />

      {/* pour afficher le contenu de chaque page, il faut ajouter les props qui sont enfants de notre container (contenu de l'app), que l'on peut déstructurer */}
      {children}
    </>
  );
};
export default Container;
