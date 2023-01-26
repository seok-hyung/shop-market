import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeName, increase } from "./../store/userSlice.js";
import { addCount, subtractCount, deleteItem } from "./../store.js";
import firebase from "firebase";
import $ from "jquery";
import data from "../data.js";
import { useState } from "react";

function Cart() {
  let [products, setProducts] = useState(data);
  // Redux store에 있던 state가 남는다.
  let state = useSelector((state) => {
    return state;
  });
  let dispatch = useDispatch(); // store.js로 요청보내주는 함수
  let totalPrice = 0;
  state.cart.map((a, i) => {
    let priceArray = products.find((e) => e.title == state.cart[i].title);
    totalPrice += priceArray.price * a.count;
  });

  return (
    <div>
      <h3>
        <span id="userName"></span>
      </h3>

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map((a, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{state.cart[i].title}</td>
                <td>{state.cart[i].count}</td>
                <td>
                  <button
                    onClick={() => {
                      // 버튼 누르면 옆의 id와 같은 id가진 상품을 찾아와서 +1
                      dispatch(addCount(i));
                    }}
                  >
                    +
                  </button>
                  <button
                    className="ms-2"
                    onClick={() => {
                      // 버튼 누르면 옆의 id와 같은 id가진 상품을 찾아와서 +1
                      dispatch(subtractCount(i));
                    }}
                  >
                    -
                  </button>
                  <button
                    className="ms-2"
                    onClick={() => {
                      // 버튼 누르면 옆의 id와 같은 id가진 상품을 찾아와서 +1
                      dispatch(deleteItem(i));
                    }}
                  >
                    x
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div style={{ float: "right" }}>
        <span id="totalPrice">총금액 : {totalPrice}원</span>
        <button className="btn btn-outline-secondary ms-3 mx-3">
          주문하기
        </button>
      </div>
    </div>
  );
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    $("#userName").html(user.displayName + "님");
  } else if (!user) {
    $("#userName").html("");
  }
});

export default Cart;
