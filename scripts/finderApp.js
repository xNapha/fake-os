import {
    appHeaderControl,
    createAppContainer,
    moveApp,
    openContextMenu,
    movePhotoToBin,
} from "./utility.js";
import { openGalleryApp, replaceGalleryImage } from "./galleryApp.js";
import appsData from "./../data/appData.js";

export const openFinderApp = (finder) => {
    const mainScreen = document.querySelector(".main-screen__allowed-area");
    // append default window container for the app
    mainScreen.appendChild(createAppContainer("finder-app"));
    // allow the app to move on drag
    const finderApp = document.querySelector(".allowed-area__finder-app");
    moveApp(finderApp);
    // customise the app header to the specified app
    appHeaderControl(finderApp, appsData[0]);

    // render the contents of the app
    renderFinder(finder);
};

export const renderFinder = (finder) => {
    const finderAppMain = document.querySelector(".finder-app__main");

    const finderNavigation = document.createElement("div");
    finderNavigation.innerHTML = "Photos";
    finderNavigation.classList.add("main", "main__navigation");

    const finderCon = document.createElement("div");
    finderCon.classList.add("main__imageCon");

    finderAppMain.append(finderNavigation, finderCon);

    finder.photos.forEach((photo, index) => {
        const inBin = photo.inBin;
        if (!inBin) {
            createFileHTML(photo, index);
        }
    });
};

export const createFileHTML = (file, index) => {
    const finderCon = document.querySelector(".main__imageCon");

    const div = document.createElement("div");
    div.classList.add("imageCon__file");

    const img = document.createElement("img");
    img.setAttribute("src", file.imageSrc);
    img.classList.add("file__icon");

    const para = document.createElement("p");
    para.textContent = file.imageName;
    div.append(img, para);

    // open gallery app with photo showing
    div.addEventListener("dblclick", (e) => {
        e.preventDefault();
        if (!document.querySelector(".gallery-app")) {
            // if gallery isnt open, open it with the image rendered inside
            openGalleryApp(file);
        } else {
            //replace image in gallery with the one you just double clicked
            replaceGalleryImage(file);
        }
    });

    openContextMenu(img, index, movePhotoToBin);

    finderCon.append(div);
};
