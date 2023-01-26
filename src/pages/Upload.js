import { db } from "../firebase";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import firebase from "firebase";
import { useEffect, useState } from "react";
import data from "../data.js";

function Upload() {
  let dbRef = db.collection("product");
  let navigate = useNavigate();
  let [products, setProducts] = useState(data);

  const storage = firebase.storage();
  return (
    <div class="container mt-3">
      <h2>상품 업로드</h2>
      <input
        type="text"
        class="form-control mt-3"
        id="title"
        placeholder="title"
      ></input>
      <textarea class="form-control mt-3" id="content">
        content
      </textarea>
      <input
        type="text"
        class="form-control mt-3"
        id="price"
        placeholder="price"
      ></input>
      <input
        type="number"
        class="form-control mt-3"
        id="stock"
        placeholder="stock"
      ></input>
      <input class="form-control mt-3" type="file" id="image"></input>
      <button
        class="btn btn-danger mt-4"
        onClick={() => {
          let file = document.querySelector("#image").files[0];
          let storageRef = storage.ref();
          let 저장할경로 = storageRef.child("shoes/" + file.name);
          let 업로드작업 = 저장할경로.put(file);

          업로드작업.on(
            "state_changed",
            // 변화시 동작하는 함수(성공시,에러시,로딩중)
            null, //(업로드 중간중간 얼마나 업로드됐는지 확인 )
            //에러시 동작하는 함수
            (err) => {
              console.log("실패사유는", err);
            },
            //성공시 동작하는 함수
            () => {
              업로드작업.snapshot.ref.getDownloadURL().then((url) => {
                console.log("업로드된 경로는", url);

                let 저장할거 = {
                  id: products.length,
                  title: $("#title").val(),
                  content: $("#content").val(),
                  price: Number($("#price").val()),
                  image: url,
                  stock: Number($("#stock").val()),
                  uid: JSON.parse(localStorage.getItem("user")).uid,
                  name: JSON.parse(localStorage.getItem("user")).displayName,
                };
                dbRef.add(저장할거).then((result) => {
                  navigate("/");
                  window.location.reload();
                });
              });
            }
          );
        }}
      >
        올리기
      </button>
    </div>
  );
}

export default Upload;
