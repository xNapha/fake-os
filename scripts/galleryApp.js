import { appHeaderControl, createAppContainer, moveApp } from "./utility.js";
import { apps } from "./../data/appData.js";

export const openGalleryApp = (gallery) => {
    const mainScreen = document.querySelector(".main-screen__allowed-area");
    mainScreen.appendChild(createAppContainer("gallery-app"));
    moveApp(document.querySelector(".allowed-area__gallery-app"));
    appHeaderControl(
        document.querySelector(".allowed-area__gallery-app"),
        apps[3]
    );

    const galleryMain = document.querySelector(".gallery-app__main");
    // create a gallery container
    const galleryCon = document.createElement("div");
    galleryCon.classList.add("main");
    galleryCon.classList.add("main__gallery");

    galleryMain.append(galleryCon);
    // rendergallery(gallery);
};
