import "./main.scss";
import Alert from "./components/Alert";
import Button from "./components/Button";

const app = document.querySelector("#app");

const elements = `${Alert("I am an Alert")} ${Button()}`;

app.innerHTML = elements;
