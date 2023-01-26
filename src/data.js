import firebase from "firebase";
import { db } from "./firebase.js";

db.collection("product")
  .orderBy("id", "asc")
  .get()
  .then((결과) => {
    결과.forEach((doc) => {
      data.push(doc.data());
    });
  });
let data = [];

export default data;
