import { appHeaderControl, createAppContainer, moveApp } from "./utility.js";
import { apps } from "./../data/appData.js";
import gallery from "./../data/galleryData.js";

export const openGalleryApp = (photo = gallery) => {
    const mainScreen = document.querySelector(".main-screen__allowed-area");
    mainScreen.appendChild(createAppContainer("gallery-app"));
    moveApp(document.querySelector(".allowed-area__gallery-app"));
    appHeaderControl(
        document.querySelector(".allowed-area__gallery-app"),
        apps[3]
    );
    // create a gallery container
    renderGallery(photo);
};

export const replaceGalleryImage = (photoInfo) => {
    const galleryMain = document.querySelector(".gallery-app__main");
    galleryMain.innerHTML = `<img src="${
        photoInfo.imageSrc
    }" class="${photoInfo.classList.join(" ")}"/>`;
};

const catPhoto = async (galleryMain, photoInfo) => {
    const json = await fetch(`https://api.thecatapi.com/v1/images/search`);
    const response = await json.json();
    galleryMain.innerHTML = `<img src="${
        response[0].url
    }" class="${photoInfo.classList.join(" ")}"/>`;
};

const renderGallery = (photoInfo) => {
    const galleryMain = document.querySelector(".gallery-app__main");
    if (photoInfo.api) {
        // if opening gallery from dock render gallery with an image of a cat from an api
        catPhoto(galleryMain, photoInfo);
    } else {
        galleryMain.innerHTML = `<img src="${
            photoInfo.imageSrc
        }" class="${photoInfo.classList.join(" ")}"/>`;
    }
};
