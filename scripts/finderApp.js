import { appHeaderControl, createAppContainer, moveApp } from "./utility.js";
import { apps } from "./../data/appData.js";

export const openFinderApp = (finder) => {
    const mainScreen = document.querySelector(".main-screen__allowed-area");
    mainScreen.appendChild(createAppContainer("finder-app"));
    moveApp(document.querySelector(".allowed-area__finder-app"));
    appHeaderControl(
        document.querySelector(".allowed-area__finder-app"),
        apps[0]
    );

    const finderMain = document.querySelector(".finder-app__main");
    // create a finder container
    const finderCon = document.createElement("div");
    finderCon.classList.add("main");
    finderCon.classList.add("main__finder");

    finderMain.append(finderCon);
    // renderFinder(finder);
};
