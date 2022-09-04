import react from "react";

const Cours = (props) => {
  console.log(props);
  return (
    <div>
      <h1 className="text-center my-2">
        le bitcoin est à :{props.results.bpi.EUR.rate}{" "}
      </h1>
    </div>
  );
};

// pour importer du contenu côté serveur, on utilise getServerSideProps, c'est plus lent qu'une page statique, mais plus fiable car les données sont plus fraiches

// pour getServerSideProps, on a pas besoin de getStaticPaths pour générer des chemins dynamiques, car on l'effectue coté serveur (à l'inverse de getStaticProps), elles vont donc être créées puis envoyées (alors que pour des pages statiques, elles sont pretes côté serveur, il ne manque plus qu'à les envoyer)

export async function getServerSideProps() {
  const data = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
  const results = await data.json();
  return {
    props: {
      results,
    },
  };
}

// https://api.coindesk.com/v1/bpi/currentprice.json

export default Cours;
