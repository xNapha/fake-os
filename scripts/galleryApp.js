import { appHeaderControl, createAppContainer, moveApp } from "./utility.js";
import appsData from "./../data/appData.js";
import gallery from "./../data/galleryData.js";

export const openGalleryApp = (photo = gallery) => {
    const mainScreen = document.querySelector(".main-screen__allowed-area");
    // append default window container for the app
    mainScreen.appendChild(createAppContainer("gallery-app"));
    // allow the app to move on drag
    const galleryApp = document.querySelector(".allowed-area__gallery-app");
    moveApp(galleryApp);
    // customise the app header to the specified app
    appHeaderControl(galleryApp, appsData[3]);
    // render the contents of the app
    renderGallery(photo);
};
// replace the current image with another one
export const replaceGalleryImage = (photoInfo) => {
    const galleryMain = document.querySelector(".gallery-app__main");
    galleryMain.innerHTML = `<img src="${
        photoInfo.imageSrc
    }" class="${photoInfo.classList.join(" ")}"/>`;
};
// if gallery is opened from the dock fetch a random cat photo to occupy the space
const catPhoto = async (galleryMain, photoInfo) => {
    const json = await fetch(photoInfo.api);
    const response = await json.json();
    galleryMain.innerHTML = `<img src="${
        response[0].url
    }" class="${photoInfo.classList.join(" ")}"/>`;
};

// render a larger image in the gallery
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
