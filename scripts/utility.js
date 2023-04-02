import appsData from "./../data/appData.js";
import bin from "./../data/binData.js";
import { createFileHTML } from "./finderApp.js";
import { renderBin } from "./recycleBinApp.js";

export const createAppContainer = (name) => {
    const appContainer = document.createElement("section");
    const nameLowerCase = name.toLowerCase();
    appContainer.classList.add(`allowed-area__${nameLowerCase}`);
    appContainer.classList.add(`${nameLowerCase}`);
    appContainer.classList.add(`apps`);

    const header = document.createElement("div");
    header.classList.add(`${nameLowerCase}__header`, `app__header`);
    header.innerHTML = `
    <p>${name.split("-")[0]}</p>
    <div>
        <i class="fa-solid fa-up-right-and-down-left-from-center expand expand--${name}"></i>
        <i class="fa-solid fa-window-minimize minimize minimize--${name}"></i>
        <i class="fa-solid fa-xmark close close--${name}"></i>
    </div>
    `;
    const main = document.createElement("div");
    main.classList.add(`${nameLowerCase}__main`);

    appContainer.append(header, main);
    return appContainer;
};

export const appHeaderControl = (app, data) => {
    const minimize = document.querySelectorAll(`.minimize--${data.name}`);
    minimize.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(
                `.allowed-area__${data.name}`
            ).style.zIndex = 0;
            data.isMinimized = !data.isMinimized;
            app.classList.add("hidden");
        });
    });
    const close = document.querySelectorAll(`.close--${data.name}`);
    close.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            data.isOpen = !data.isOpen;
            app.remove();
        });
    });

    const expand = document.querySelectorAll(`.expand--${data.name}`);
    expand.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            app.style.removeProperty("top");
            app.style.removeProperty("left");
            app.classList.toggle("expand-app");
            app.classList.toggle(`${data.name}`);
        });
    });
};

export const moveApp = (app) => {
    // click on app to get current mouse positions
    let mousePosX = 0,
        mousePosY = 0,
        updatedMousePosX = 0,
        updatedMousePosY = 0;
    const mainScreen = document.querySelector(".main-screen__allowed-area");

    // on mouse click save mouse positions
    const getMousePosition = (event) => {
        event.preventDefault();
        mousePosX = event.clientX;
        mousePosY = event.clientY;
        app.style.zIndex++;
        app.style.zIndex++;
        // initiate capturing mouse location on mouse move

        mainScreen.addEventListener("mousemove", updateMousePosition);
        mainScreen.addEventListener("mouseup", removeEventListeners);
    };

    // update app position on screen as mouse moves
    const updateMousePosition = (event) => {
        event.preventDefault();
        updatedMousePosX = mousePosX - event.clientX;
        updatedMousePosY = mousePosY - event.clientY;
        mousePosX = event.clientX;
        mousePosY = event.clientY;

        app.style.left = `${app.offsetLeft - updatedMousePosX}px`;
        app.style.top = `${app.offsetTop - updatedMousePosY}px`;
        // stop app from going past the tool bar on the top of the screen
        const toolbar = document.querySelector(".container-tool-bar");
        if (
            app.getBoundingClientRect().top <=
            toolbar.getBoundingClientRect().bottom
        ) {
            app.style.top = toolbar.getBoundingClientRect().bottom - 20 + "px";
        }
        // // stop app from going past the dock on the bottom of the screen
        const dock = document.querySelector(".dock");
        if (
            app.firstChild.getBoundingClientRect().bottom >=
            dock.getBoundingClientRect().top
        ) {
            app.style.top = dock.getBoundingClientRect().top - 36 + "px";
        }
    };
    // stop app from moving after mouse click is no longer being held
    const removeEventListeners = (event) => {
        event.preventDefault();
        app.style.zIndex--;
        mainScreen.removeEventListener("mousemove", updateMousePosition);
        mainScreen.removeEventListener("mouseup", removeEventListeners);
    };

    if (app.firstChild) {
        app.firstChild.addEventListener("mousedown", getMousePosition);
    } else {
        app.addEventListener("mousedown", getMousePosition);
    }
    mainScreen.addEventListener("mouseleave", removeEventListeners);
};

export const openContextMenu = (
    element,
    index,
    script = false,
    text = "Move to bin"
) => {
    const mainScreen = document.querySelector(".main-screen__allowed-area");

    const createContextMenu = (event) => {
        const div = document.createElement("div");
        div.classList.add("context-menu");
        div.innerHTML = text;

        div.addEventListener("click", (e) => {
            e.preventDefault();
            if (script) {
                script(index);
            }
        });

        mainScreen.append(div);

        const contextMenu = document.querySelector(".context-menu");
        contextMenu.style.left = `${event.clientX}px`;
        contextMenu.style.top = `${event.clientY - 15}px`;
    };

    element.addEventListener("contextmenu", (event) => {
        event.preventDefault();

        if (document.querySelector(".context-menu")) {
            document.querySelector(".context-menu").remove();
            createContextMenu(event);
        } else {
            createContextMenu(event);
        }
    });
};

export const removeContextMenu = () => {
    const contextMenu = document.querySelector(".context-menu");

    if (contextMenu) {
        contextMenu.remove();
    }
};

export const movePhotoToBin = (index) => {
    const imgData = appsData[0].data.photos[index];
    imgData.inBin = !imgData.inBin;
    bin.push(imgData);

    const binMain = document.querySelector(".bin-app__main");
    if (binMain) {
        const binMain = document.querySelector(".bin-app__main--imageCon");
        binMain.innerHTML = "";
        renderBin(bin);
    }
    const imageCon = document.querySelector(".main__imageCon");
    imageCon.innerHTML = "";

    appsData[0].data.photos.forEach((photo, index) => {
        const inBin = photo.inBin;
        if (!inBin) {
            createFileHTML(photo, index);
        }
    });
};
