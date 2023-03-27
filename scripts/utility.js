export const createAppContainer = (name) => {
    const appContainer = document.createElement("section");
    appContainer.classList.add(`allowed-area`);
    appContainer.classList.add(`allowed-area__${name}`);

    const header = document.createElement("div");
    header.classList.add(`${name}__header`);
    header.classList.add(`app--header`);
    header.innerHTML = `
    <p>${name}<p>
    <div>
        <i class="fa-solid fa-up-right-and-down-left-from-center expand"></i>
        <i class="fa-solid fa-window-minimize minimize"></i>
        <i class="fa-solid fa-xmark close"></i>
    </div>
    `;

    const main = document.createElement("div");
    main.classList.add(`${name}__main`);

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
        if (app.offsetTop - updatedMousePosY <= 0) {
            app.style.top = `0px`;
        } else {
            app.style.top = `${app.offsetTop - updatedMousePosY}px`;
        }
        if (
            app.firstChild.getBoundingClientRect().bottom >=
            mainScreen.getBoundingClientRect().bottom
        ) {
            app.style.top =
                mainScreen.getBoundingClientRect().bottom - 36 + "px";
        }
        // if(app.firstChild.style.bot > mainScreen.clientHeight)
    };
    // stop app from moving after mouse click is no longer being held
    const removeEventListeners = (event) => {
        event.preventDefault();
        mainScreen.removeEventListener("mousemove", updateMousePosition);
        mainScreen.removeEventListener("mouseup", removeEventListeners);
    };

    app.firstChild.addEventListener("mousedown", getMousePosition);
    mainScreen.addEventListener("mouseleave", removeEventListeners);
};
