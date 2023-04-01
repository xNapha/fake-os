import { appHeaderControl, createAppContainer, moveApp } from "./utility.js";
import { openGalleryApp, replaceGalleryImage } from "./galleryApp.js";
import { apps } from "./../data/appData.js";

export const openFinderApp = (finder) => {
    const mainScreen = document.querySelector(".main-screen__allowed-area");
    mainScreen.appendChild(createAppContainer("finder-app"));
    moveApp(document.querySelector(".allowed-area__finder-app"));
    appHeaderControl(
        document.querySelector(".allowed-area__finder-app"),
        apps[0]
    );

    renderFinder(finder);
};

const renderFinder = (finder) => {
    const finderApp = document.querySelector(".finder-app__main");
    const finderNavigation = document.createElement("div");
    finderNavigation.innerHTML = "Photos";
    finderNavigation.classList.add("main", "main__navigation");
    finderApp.appendChild(finderNavigation);

    const finderMain = document.querySelector(".finder-app__main");
    const finderCon = document.createElement("div");
    finderCon.classList.add("main");
    finderCon.classList.add("main__finder");
    finderMain.append(finderCon);
    finder.photos.forEach((photo) => {
        createFileHTML(photo);
    });
};

const createFileHTML = (file) => {
    const finderCon = document.querySelector(".main__finder");
    const div = document.createElement("div");
    div.classList.add("finder", "finder__file");
    div.innerHTML = `<img src="${file.imageSrc}" class="file file__icon"><p>${file.imageName}</p>`;

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

    //open context menu, rename , delete;
    div.addEventListener("contextmenu", (e) => {
        e.preventDefault();
    });

    finderCon.append(div);
};
