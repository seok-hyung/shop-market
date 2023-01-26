import { useEffect, useMemo, useState } from "react";
import { Nav } from "react-bootstrap";
import { Tab } from "bootstrap";
import { addItem } from "../store.js";
import { useDispatch } from "react-redux";
import { useNavigate, Route, Routes, useParams } from "react-router-dom";
import firebase from "firebase";
import $ from "jquery";
import Edit from "./Edit.js";
import data from "../data.js";
import { db } from "../firebase.js";

function Detail(props) {
  //유저가 :id에 적은거 가져와줌
  let { id } = useParams();
  let [products, setProducts] = useState(data);
  let 찾은상품 = props.products[id];
  let [alert, setAlert] = useState(true);
  let [tab, setTab] = useState(0);
  let dispatch = useDispatch();
  let 꺼낸거 = localStorage.getItem("watched");
  let navigate = useNavigate();

  let storage = firebase.storage();
  let deleteRef = storage.ref().child(`shoes/shoes${Number(id) + 1}.jpg`);

  useEffect(() => {
    꺼낸거 = JSON.parse(꺼낸거);
    꺼낸거.push(찾은상품.id);
    // 재접속하면 번호가 무한히 추가됨 --> 중복제거 필요
    꺼낸거 = new Set(꺼낸거);
    꺼낸거 = Array.from(꺼낸거);
    localStorage.setItem("watched", JSON.stringify(꺼낸거));
  }, []);

  useEffect(() => {
    let a = setTimeout(() => {
      setAlert(false);
    }, 6000000);

    return () => {
      // cleanup function, mount시 실행안됨, unmount시 실행됨 (unmount는 컴포넌스가 사라지는걸 의미, 다른페이지 넘아가거나 등등)
      // useEffect 함수가 실행되기 이전에 실행됨
      //기존 타이머는 제거하기
      clearTimeout(a); // 2초 후에 타이머 실행을 요청하는데, 2초 이전에 재랜더링을 하면 기존의 타이머 요청이 끝나기도 전에 또 요청을 날리고 버그생길 수 있음
    };
  }); // useEffect 실행조건 넣을 수 있는 곳 [] ==> count라는 변수가 변경이 될때만 실행

  function isTrue() {
    if (JSON.parse(localStorage.getItem("user")).uid == products[id].uid) {
      return true;
    }
    return false;
  }
  let result = useMemo(() => {
    return isTrue();
  }, []);

  return (
    <div className="container">
      {alert == true ? (
        <div className="alert alert-warning">10분 이내 구매시 할인</div>
      ) : null}
      {/* {count}<button onClick={() => {setCount(count + 1);}}>버튼</button> */}
      <div className="row" id="flex-container">
        <div className="col-md">
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/shop-993f3.appspot.com/o/shoes%2Fshoes" +
              (Number(id) + 1) +
              ".jpg?alt=media"
            }
            width="100%"
          />
        </div>
        <div className="col-md">
          {/* <h4 className="pt-5">{props.shoes[id].title}</h4> 이 경우에는 정렬했을때 shoes[0]의 값이 달라진다*/}
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>
          <p>
            <input id="count" type="number"></input>
          </p>

          <button className="btn btn-success" onClick={() => {}}>
            구매하기
          </button>
          <button
            className="btn btn-outline-secondary ms-1"
            onClick={() => {
              dispatch(
                addItem({
                  id: 찾은상품.id,
                  title: 찾은상품.title,
                  count: Number($("#count").val()),
                })
              );
            }}
          >
            장바구니
          </button>
          {isTrue() ? (
            <div>
              <button
                className="btn btn-outline-primary ms-1"
                onClick={() => {
                  navigate(`/edit/${id}`);
                }}
              >
                수정하기
              </button>
              <button
                className="btn btn-outline-danger ms-1"
                onClick={() => {
                  db.collection("product")
                    .where("id", "==", Number(id))
                    .get()
                    .then((res) => {
                      res.forEach((doc) => {
                        db.collection("product").doc(doc.id).delete();
                        let ref = `https://firebasestorage.googleapis.com/v0/b/shop-993f3.appspot.com/o/shoes%2Fshoes${
                          Number(id) + 1
                        }.jpg?alt=media`;
                        ref
                          .delete()
                          .then(() => {
                            navigate(`/`);
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      });
                    });
                }}
              >
                삭제하기
              </button>
            </div>
          ) : null}
        </div>
        <div className="col-md">
          <Recent
            products={props.products}
            꺼낸거={꺼낸거}
            찾은상품={찾은상품}
          />
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(0);
            }}
            eventKey="link0"
          >
            상세정보
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(1);
            }}
            eventKey="link1"
          >
            배송/교환/환불
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(2);
            }}
            eventKey="link2"
          >
            상품후기
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTab(3);
            }}
            eventKey="link3"
          >
            상품문의
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} />
    </div>
  );
}

function TabContent(props) {
  if (props.tab == 0) {
    return <div>상품의 상세정보</div>;
  } else if (props.tab == 1) {
    return <div>배송/교환/환불 내용들</div>;
  } else if (props.tab == 2) {
    return <div>상품후기 내용</div>;
  } else if (props.tab == 3) {
    return <div>상품문의 내용</div>;
  }
}

function Recent(props) {
  let navigate = useNavigate();
  return (
    <div className="recent-products">
      <p>최근 본 상품</p>
      {JSON.parse(props.꺼낸거).map((a, i) => {
        return (
          <div
            onClick={() => {
              navigate(`/detail/${a}`);
            }}
          >
            <img
              src={
                "https://firebasestorage.googleapis.com/v0/b/shop-993f3.appspot.com/o/shoes%2Fshoes" +
                (Number(a) + 1) +
                ".jpg?alt=media"
              }
              width="80%"
            />
            <h6>{props.products[a].title}</h6>
            <p>{props.products[a].price}원</p>
          </div>
        );
      })}
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

export default Detail;
