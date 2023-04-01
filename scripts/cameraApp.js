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

    const webCamMain = document.querySelector(".camera-app__main");
    // create a webCam container
    const webCamCon = document.createElement("div");
    webCamCon.classList.add("main");
    webCamCon.classList.add("main__camera");

    webCamMain.append(webCamCon);
    // renderwebCam(webCam);
};