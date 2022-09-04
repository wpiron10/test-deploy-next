import React from "react";
import { useRef } from "react";

const Add = () => {
  const enWord = useRef();
  const frWord = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newWord = {
      en: enWord.current.value,
      fr: frWord.current.value,
    };
    fetch("api/vocapi", {
      method: "POST",
      body: JSON.stringify(newWord),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data");
      });
    enWord.current.value = "";
    frWord.current.value = "";
  };

  return (
    <div>
      <h1>Hello</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="addEn">Ajouter un mot en anglais</label>
        <br />
        <input type="text" id="addEn" ref={enWord}></input>
        <br />
        <label htmlFor="addFr">Ajouter un mot en français</label>
        <br />
        <input type="text" id="addFr" ref={frWord}></input> <br />
        <button>Ajouter</button>
      </form>
    </div>
  );
};
export default Add;
