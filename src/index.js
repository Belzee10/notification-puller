import "react";
import "react-dom";
import Button from "./components/Button";
import "./main.scss";
import { bake } from "./components/Shake";

bake();

const app = document.querySelector("#app");

app.appendChild(Button());
