import { openChessApp } from "../scripts/chessApp.js";
import { openBinApp } from "../scripts/recycleBinApp.js";
import { openFinderApp } from "../scripts/finderApp.js";
import { openWebCamApp } from "../scripts/webCamApp.js";
import { openGalleryApp } from "../scripts/galleryApp.js";

export const apps = [
    {
        id: 1,
        name: "finder",
        isOpen: false,
        isMinimized: false,
        iconSrc: `./../assets/folder-solid.svg`,
        script: openFinderApp,
        classList: ["app__icons"],
        toolBar: [],
    },
    {
        id: 2,
        name: "chess-app",
        isOpen: false,
        isMinimized: false,
        iconSrc: `./../assets/chess-icons/chess-solid.svg`,
        script: openChessApp,
        classList: ["app__icons"],
        toolBar: [],
    },
    {
        id: 3,
        name: "web-camera-app",
        isOpen: false,
        isMinimized: false,
        iconSrc: `./../assets/video-solid.svg`,
        script: openWebCamApp,
        classList: ["app__icons"],
        toolBar: [],
    },
    {
        id: 3,
        name: "gallery-app",
        isOpen: false,
        isMinimized: false,
        iconSrc: `./../assets/image-solid.svg`,
        script: openGalleryApp,
        classList: ["app__icons"],
        toolBar: [],
    },
    {
        id: 4,
        name: "recycling-bin",
        isOpen: false,
        isMinimized: false,
        iconSrc: `./../assets/trash-can-solid.svg`,
        script: openBinApp,
        classList: ["app__icons"],
        toolBar: [],
    },
];
