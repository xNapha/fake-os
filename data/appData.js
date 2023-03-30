import { openChessApp } from "../scripts/chessApp.js";
import { openBin } from "../scripts/recycleBin.js";
export const apps = [
    {
        id: 1,
        name: "chess-app",
        isOpen: false,
        isMinimized: false,
        icon: `<i class="fa-solid fa-chess dock__icon"></i>`,
        script: openChessApp,
    },
    {
        id: 2,
        name: "recycling-bin",
        isOpen: false,
        isMinimized: false,
        icon: `<i class="fa-solid fa-trash-can dock__icon"></i>`,
        script: openBin,
    },
];
