/*eslint-disable */
import { lazy, Suspense, useEffect, useState } from "react";
import Detail from "./pages/Detail.js";
import Cart from "./pages/Cart.js";
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";

import "./App.css";
import data from "./data.js";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";

import Register from "./pages/Register.js";
import Login from "./pages/LogIn.js";
import Upload from "./pages/Upload.js";
import Edit from "./pages/Edit";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { db, auth } from "./firebase.js";

import $ from "jquery";

function App() {
  useEffect(() => {
    if (
      localStorage.getItem("watched") == false ||
      localStorage.getItem("infiniteScrollEnabled") == null
    ) {
      localStorage.setItem("watched", JSON.stringify([]));
    }
  }, []);
  let [products, setProducts] = useState(data);
  let navigate = useNavigate(); // 페이지 이동
  const storage = firebase.storage();
  // find 함수 연습
  //let aa = products.find((element, index, arr) => element.id);
  //console.log(aa);

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Shoes Shop</Navbar.Brand>

          <Nav className="ms-4">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
            <Nav.Link>
              <span
                id="upload"
                onClick={() => {
                  navigate("/upload");
                }}
              ></span>
            </Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            <Nav.Link
              onClick={() => {
                navigate("/register");
              }}
            >
              {" "}
              회원가입
            </Nav.Link>
            <Nav.Link
              id="isLogin"
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </Nav.Link>
            <Nav.Link>
              <span id="userName"></span>
            </Nav.Link>
            <Nav.Link
              id="logout"
              onClick={() => {
                firebase.auth().signOut();
                localStorage.removeItem("user");
                navigate("/");
                window.location.reload();
              }}
            ></Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <div className="container">
                <div className="row">
                  {products.map((a, i) => {
                    return <Card products={products} i={i} />;
                  })}
                </div>
              </div>
            </>
          }
        />

        <Route path="/detail/:id" element={<Detail products={products} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/edit/:id" element={<Edit products={products} />} />
      </Routes>
    </div>
  );
}

function Card(props) {
  let navigate = useNavigate();
  return (
    <div
      className="col"
      onClick={() => {
        navigate(`/detail/${props.i}`);
      }}
    >
      <img
        src={
          "https://firebasestorage.googleapis.com/v0/b/shop-993f3.appspot.com/o/shoes%2Fshoes" +
          (props.i + 1) +
          ".jpg?alt=media"
        }
        width="100%"
      />
      <h4>{props.products[props.i].title}</h4>
      <p>{props.products[props.i].price}</p>
    </div>
  );
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    $("#upload").html("Upload");
    $("#userName").html(user.displayName + "님");
  } else if (!user) {
    $("#userName").html("");
  }
});

export default App;

{
  /* <button
                  onClick={() => {
                    axios
                      .get("https://codingapple1.github.io/shop/data2.json")
                      .then((결과) => {
                        let copy = [...shoes, ...결과.data];
                        setShoes(copy);
                      });
                  }}
                >
                  더보기
                </button> */
}

{
  /* {shoes.map((a, i) => {
    return <Card shoes={shoes[i]} i={i + 1} db={db}></Card>;
})} */
}

// <div
//   className="col"
//   onClick={() => {
//     navigate(`/detail/${props.i}`);
//   }}
// >
//   {console.log("ddd")}
//   <img
//     width="80%"
//     src={`https://firebasestorage.googleapis.com/v0/b/shop-993f3.appspot.com/o/shoes${props.i}.jpg?alt=media`}
//   />
//   <h4 id="title"></h4>
//   <p id="price"></p>
// </div>

// const db = firebase.firestore();
// db.collection("product")
//   .doc(`shoes${props.i}`)
//   .get()
//   .then((doc) => {
//     $("#title").html(doc.data().title);
//     $("#price").html(doc.data().price);
//   });

// let storageRef = storage.ref();
// let 저장할경로 = storageRef.child("image/" + file.name);

// db.collection("product")
//   .get()
//   .then((결과) => {
//     결과.forEach((doc) => {
//       console.log(doc.data().title);
//     });
//   });

{
  /*docRef
  .doc("shoes1")
            .get()
            .then((doc) => {
              $("#title").html(doc.data().title);
            })*/
}

{
  /*<div>
        
        {db
          .collection("product")
          .get()
          .then((결과) => {
            결과.forEach((doc) => {
              console.log(doc.data());
            });
          })}
        </div>*/
}

{
  /* {db
                    .collection("product")
                    .get()
                    .then((결과) => {
                      결과.map((a, i) => {
                        return <Card shoes={shoes[i]} i={i + 1} />;
                      });
                    })} */
}
