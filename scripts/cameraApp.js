import { appHeaderControl, createAppContainer, moveApp } from "./utility.js";
import { apps } from "../data/appData.js";

export const openCameraApp = (cam) => {
    const mainScreen = document.querySelector(".main-screen__allowed-area");
    mainScreen.appendChild(createAppContainer("camera-app"));
    moveApp(document.querySelector(".allowed-area__camera-app"));
    appHeaderControl(
        document.querySelector(".allowed-area__camera-app"),
        apps[2]
    );

    // renderwebCam(webCam);
};
