import { appHeaderControl, createAppContainer, moveApp } from "./utility.js";
import { apps } from "./../data/appData.js";

export const openBinApp = (bin) => {
    const mainScreen = document.querySelector(".main-screen__allowed-area");
    mainScreen.appendChild(createAppContainer("bin-app"));
    moveApp(document.querySelector(".allowed-area__bin-app"));
    appHeaderControl(document.querySelector(".allowed-area__bin-app"), apps[4]);

    const binMain = document.querySelector(".bin-app__main");
    // create a bin container
    const binCon = document.createElement("div");
    binCon.classList.add("main");
    binCon.classList.add("main__bin");

    binMain.append(binCon);
    // renderbin(bin);
};
