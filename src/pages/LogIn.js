import firebase from "firebase/app";
import "firebase/auth";
import { useNavigate } from "react-router-dom";
import $ from "jquery";

function Login() {
  let navigate = useNavigate();

  return (
    <div className="container mt-3">
      <h2>로그인</h2>
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="email"
          id="email"
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="pw"
          id="pw"
        />
      </div>
      <button
        onClick={(e) => {
          let 이메일 = $("#email").val();
          let 패스워드 = $("#pw").val();
          firebase
            .auth()
            .signInWithEmailAndPassword(이메일, 패스워드)
            .then((result) => {
              navigate("/");
            });
        }}
        type="submit"
        className="btn btn-primary"
        id="login"
      >
        로그인
      </button>
    </div>
  );
}
let 뺀거 = localStorage.getItem("user");
// $("#userName").html(JSON.parse(뺀거).displayName + "님");

//로그인시, 로그아웃시, 새로고침시 실행됨
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    $("#isLogin").html("");
    $("#logout").html("로그아웃");

    localStorage.setItem("user", JSON.stringify(user));
  } else if (!user) {
    $("#userName").html("");
  }
});

export default Login;
