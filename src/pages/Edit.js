import { db } from "../firebase";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import firebase from "firebase";
import { useEffect, useState } from "react";
import data from "../data.js";
import { useParams } from "react-router-dom";

function Edit(props) {
  let dbRef = db.collection("product");
  let navigate = useNavigate();
  let { id } = useParams();
  let [products, setProducts] = useState(data);
  const storage = firebase.storage();

  return (
    <div class="container mt-3">
      <h2>상품 수정</h2>
      <div className="col-md">
        <img
          src={
            "https://firebasestorage.googleapis.com/v0/b/shop-993f3.appspot.com/o/shoes%2Fshoes" +
            (Number(id) + 1) +
            ".jpg?alt=media"
          }
          width="40%"
        />
      </div>
      <input
        type="text"
        class="form-control mt-3"
        id="title"
        placeholder={products[id].title}
      ></input>
      <textarea class="form-control mt-3" id="content">
        {products[id].content}
      </textarea>
      <input
        type="text"
        class="form-control mt-3"
        id="price"
        placeholder={products[id].price}
      ></input>
      <input
        type="number"
        class="form-control mt-3"
        id="stock"
        placeholder={products[id].stock}
      ></input>
      <input class="form-control mt-3" type="file" id="image"></input>
      <button
        class="btn btn-danger mt-4"
        onClick={() => {
          let 바꿀거 = {
            title: $("#title").val(),
            content: $("#content").val(),
            price: Number($("#price").val()),
            stock: Number($("#stock").val()),
          };
          db.collection("product")
            .where("id", "==", Number(id))
            .get()
            .then((res) => {
              res.forEach((doc) => {
                db.collection("product").doc(doc.id).update(바꿀거);
                navigate(`/detail/${id}`);
              });
            });
     
        }}

       
      >
        수정
      </button>
    </div>
  );
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    $("#upload").html("Upload");
  } else if (!user) {
    $("#userName").html("");
  }
});

export default Edit;
