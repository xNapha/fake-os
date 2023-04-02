import {
    appHeaderControl,
    createAppContainer,
    moveApp,
    openContextMenu,
} from "./utility.js";
import appsData from "./../data/appData.js";
import binData from "./../data/binData.js";

export const openBinApp = (binData) => {
    const mainScreen = document.querySelector(".main-screen__allowed-area");
    // append default window container for the app
    mainScreen.appendChild(createAppContainer("bin-app"));
    // allow the app to move on drag
    const binApp = document.querySelector(".allowed-area__bin-app");
    moveApp(binApp);
    // customise the app header to the specified app
    appHeaderControl(binApp, appsData[4]);
    // render the contents of the app
    renderBin(binData);
};

export const renderBin = (binData) => {
    const binApp = document.querySelector(".bin-app__main");

    const binCon = document.createElement("div");
    binCon.classList.add("bin-app__main--imageCon");
    binApp.append(binCon);
    // for each item in the binData
    binData.forEach((item, index) => {
        const isPerm = item.permDeleted;
        if (!isPerm) {
            createBinHTML(item, index);
        }
    });
};

const createBinHTML = (item, index) => {
    const binMain = document.querySelector(".bin-app__main--imageCon");
    const div = document.createElement("div");
    div.classList.add("imageCon__file");

    const img = document.createElement("img");
    img.setAttribute("src", item.imageSrc);
    img.classList.add("file__icon");

    const para = document.createElement("p");
    para.textContent = item.imageName;

    div.append(img, para);
    binMain.append(div);

    openContextMenu(img, index, deleteFromComp, "Delete");
};

const deleteFromComp = (index) => {
    const binMain = document.querySelector(".bin-app__main--imageCon");
    binData[index].permDeleted = !binData[index].permDeleted;

    binMain.innerHTML = "";
    renderBin(binData);
};
