import styled from "styled-components";

let cart = [
  { id: 0, name: "White and Black", count: 2 },
  { id: 1, name: "Grey Yordan", count: 1 },
];

cart.map((a, i) => {
  console.log(a);
  console.log(i);
});
let YellowBtn = styled.button`
  background: ${(props) => props.bg};
  color: ${(props) => (props.bg == "blue" ? "white" : "black")};
  padding: 10px;
`;
let Box = styled.div`
  background: grey;
  padding: 20px;
`;

function Test() {
  <YellowBtn bg="blue">버튼</YellowBtn>;
}

<h4 style={"font-size : 50px;"}>안녕안녕안녕</h4>;
