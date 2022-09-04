// Lorsqu'on créé une page on donne un nom en minuscule (contact.js)
// index.js est la racine de notre projet (index.html), tous les fichiers créés dans pages crééent des pages web directement :
// localhost:3000/contact

// cest pour cette raison que l'on nomme nos fichiers en minuscule
// On n'a pas besoin de react router du coup
// (suite dans blog)

const Contact = (props) => {
  console.log(props);
  return (
    <div>
      <h1> {props.data.quotes[0].text}</h1>
    </div>
  );
};
export default Contact;

// import api de citation via getstaticprops

export async function getStaticProps() {
  const quote = await fetch(
    "https://goquotes-api.herokuapp.com/api/v1/random?count=1"
  );
  const data = await quote.json();
  return {
    props: {
      data,
    },
    // si par exemple, on veut simuler laffichage d'une citation différente toutes les 20sec (incremental static generation):
    revalidate: 20,

    // il faut donc attendre 20 sec et si on recharge la page, on aura un contenu différent (pas avant ce délai)

    // pour voir cela, on va utiliser npm run start après run build, pour voir les pages consolidées après qu ele build soit réalisé
  };
}

// https://goquotes-api.herokuapp.com/api/v1/random?count=1
