import { appHeaderControl, createAppContainer, moveApp } from "./utility.js";
import appsData from "../data/appData.js";

export const openCameraApp = (cam) => {
    const mainScreen = document.querySelector(".main-screen__allowed-area");
    mainScreen.appendChild(createAppContainer("camera-app"));
    const cameraApp = document.querySelector(".allowed-area__camera-app");
    moveApp(cameraApp);
    appHeaderControl(cameraApp, appsData[2]);

    // renderwebCam(webCam);
};
