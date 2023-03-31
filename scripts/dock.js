// render app icons in dock
export const addToDock = (app) => {
    const dockCon = document.querySelector(".dock__container");
    const appIconContainer = document.createElement("div");
    appIconContainer.addEventListener("click", (e) => {
        e.preventDefault();
        if (!document.querySelector(`.${app.name}`)) {
            app.script(app.data);
        } else if (app.isMinimized || document.querySelector(`.${app.name}`)) {
            // show app if miinimized
            document.querySelector(`.${app.name}`).classList.toggle("hidden");
            app.isMinimized = !app.isMinimized;
        }
    });
    appIconContainer.innerHTML = `<img src="${
        app.iconSrc
    }" class="${app.classList.join(" ")}">`;
    dockCon.append(appIconContainer);
};
