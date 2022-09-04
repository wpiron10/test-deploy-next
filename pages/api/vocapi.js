import fs from "fs";

import path from "path";
import listes from "../listes";

export default function handler(req, res) {
  if (req.method === "GET") {
    // méthode GET via node js (sans axios) : on vient rechercher le chemin vers notre fichier liste.json
    const filePath = path.join(process.cwd(), "data", "listes.json");
    // on le lit
    const fileData = fs.readFileSync(filePath);
    // on le transforme en json pour pouvoir l'exploiter
    const data = JSON.parse(fileData);
    res.status(200).json(data);
  } else if (req.method === "POST") {
    // méthode POST sans axios : comme pour get, on recherche le chemin vers notre listes.json pour ajouter des éléménts
    const enWord = req.body.en;
    const frWord = req.body.fr;
    // on recréé l'objet au format de notre api
    const newWord = {
      en: enWord,
      fr: frWord,
    };

    const filePath = path.join(process.cwd(), "data", "listes.json");
    // on le lit

    const fileData = fs.readFileSync(filePath);
    // on le transforme en json pour pouvoir l'exploiter

    const data = JSON.parse(fileData);
    // on ajoute ici le nouveau mot créé

    data.englishList[0].data.push(newWord);
    // Writefilesync permet de recréer un fichier en partant de l'ancien avec le chemin et nos données stringifiées
    fs.writeFileSync(filePath, JSON.stringify(data));

    // code 201 : succès de notre méthode post
    res.status(201).json({ message: "succès!" });
  }
}
