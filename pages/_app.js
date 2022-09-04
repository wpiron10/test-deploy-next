// Pour utiliser une navbar qui va etre visible sur plusieurs pages de notre application, on va utiliser _app.js

// toutes les pages créés par notre application vont passer par ce composant (comme app.js dans react)
// on va donc utiliser un container (ou wrapper ici) pour englober le tout
// ce container peut etre utile pour une navbar, mais aussi un footer, une modale, etc

import "../styles/globals.css";

// on importe notre container
import Container from "../components/Container/Container";

function MyApp({ Component, pageProps }) {
  return (
    // On place notre container comme ici, pour afficher le contenu de ces pages, il faut obligatoirement dans container ajouter le contenu des props enfants avec {props.children}
    <Container>
      <Component {...pageProps} />;
    </Container>
  );
}

export default MyApp;
