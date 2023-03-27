import { createAppContainer, moveApp } from "./utility.js";

const mainScreen = document.querySelector(".main-screen__allowed-area");

mainScreen.append(createAppContainer("chess-app"));

moveApp(document.querySelector(".allowed-area__chess-app"));
