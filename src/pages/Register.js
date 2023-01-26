import "../App.css";
import firebase from "../firebase.js";
import "firebase/auth";
import "firebase/firestore";
import { Route, Routes, useNavigate } from "react-router-dom";
import $ from "jquery";

function Register() {
  // let a = $("#email-new").val();
  let navigate = useNavigate();
  return (
    <div className="container mt-3">
      <div className="mb-3">
        <h2>회원가입</h2>
        <input
          type="text"
          className="form-control"
          placeholder="name"
          id="name-new"
        ></input>
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="email"
          id="email-new"
        ></input>
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="pw"
          id="pw-new"
        ></input>
      </div>
      <button
        type="submit"
        onClick={(res) => {
          let 이메일 = $("#email-new").val();
          let 패스워드 = $("#pw-new").val();
          let 이름 = $("#name-new").val();

          firebase
            .auth()
            .createUserWithEmailAndPassword(이메일, 패스워드)
            .then((result) => {
              result.user.updateProfile({ displayName: 이름 });
              navigate("/");
            });
        }}
        className="btn btn-primary"
      >
        가입하기
      </button>
    </div>
  );
}

export default Register;
