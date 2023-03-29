export const createAppContainer = (name) => {
    const appContainer = document.createElement("section");
    appContainer.classList.add(`allowed-area__${name.toLowerCase()}`);
    appContainer.classList.add(`${name.toLowerCase()}`);
    appContainer.classList.add(`apps`);

    const header = document.createElement("div");
    header.classList.add(`${name.toLowerCase()}__header`);
    header.classList.add(`app--header`);
    header.innerHTML = `
    <p>${name.split("-")[0]}<p>
    <div>
        <i class="fa-solid fa-up-right-and-down-left-from-center expand"></i>
        <i class="fa-solid fa-window-minimize minimize"></i>
        <i class="fa-solid fa-xmark close"></i>
    </div>
    `;

    const main = document.createElement("div");
    main.classList.add(`${name.toLowerCase()}__main`);

    appContainer.append(header, main);
    return appContainer;
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
            app.getBoundingClientRect().bottom >=
            dock.getBoundingClientRect().top
        ) {
            app.style.top = dock.getBoundingClientRect().top - 36 + "px";
        }
    };
    // stop app from moving after mouse click is no longer being held
    const removeEventListeners = (event) => {
        event.preventDefault();
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
