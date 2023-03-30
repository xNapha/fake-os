import { chessPiecesData } from "../data/chessPieces.js";
import { board } from "../data/chessBoard.js";
// render app icons in dock

export const addToDock = (apps) => {
    const dockCon = document.querySelector(".dock__container");

    for (let i = 0; i < apps.length; i++) {
        const appIconContainer = document.createElement("div");
        appIconContainer.addEventListener("click", (e) => {
            e.preventDefault();
            if (!apps[i].isOpen) {
                //open app if closed
                apps[i].script(chessPiecesData, board);
                apps[i].isOpen = !apps[i].isOpen;
            } else if (apps[i].isMinimized || apps[i].isOpen) {
                // show app if miinimized
                document
                    .querySelector(`.${apps[i].name}`)
                    .classList.toggle("hidden");
                apps[i].isMinimized = !apps[i].isMinimized;
            }
        });
        appIconContainer.innerHTML = apps[i].icon;
        dockCon.append(appIconContainer);
    }
};
