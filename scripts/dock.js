// render app icons in dock
export const addToDock = (app) => {
    const dockCon = document.querySelector(".dock__container");
    const appIconContainer = document.createElement("div");
    const allowedAreaApp = `.allowed-area__${app.name}`;
    appIconContainer.addEventListener("click", (e) => {
        e.preventDefault();
        if (!document.querySelector(allowedAreaApp)) {
            app.script(app.data);
        } else if (app.isMinimized || document.querySelector(allowedAreaApp)) {
            // show app if miinimized
            document.querySelector(allowedAreaApp).classList.toggle("hidden");
            document.querySelector(allowedAreaApp).style.zIndex = 0;
            app.isMinimized = !app.isMinimized;
        }
    });
    appIconContainer.innerHTML = `<img src="${
        app.iconSrc
    }" class="${app.classList.join(" ")}">`;
    dockCon.append(appIconContainer);
};
