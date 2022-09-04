import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

const listes = (props) => {
  console.log(
    props.arr.forEach((item) => console.log(Object.keys(item)[0])),
    "elem 0"
  );
  return (
    <div>
      <h1 className="my-4">Les listes de vocabulaire</h1>
      <ul className="list-group">
        {props.arr.map((item, i) => {
          return (
            <li className="list-group-item" key={uuidv4()}>
              {/* <Link href={Object.keys(item)[0]}> */}
              <Link href={`/listes/${item.name}`}>
                <a>{item.name}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default listes;

export async function getStaticProps() {
  const listesFunc = await import("../../data/listes.json");
  const arr = listesFunc.englishList;
  return {
    props: {
      arr,
    },
  };
}
