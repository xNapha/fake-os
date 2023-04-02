import { openChessApp } from "../scripts/chessApp.js";
import { openBinApp } from "../scripts/recycleBinApp.js";
import { openFinderApp } from "../scripts/finderApp.js";
import { openCameraApp } from "../scripts/cameraApp.js";
import { openGalleryApp } from "../scripts/galleryApp.js";
import chessData from "./chessBoard.js";
import finderData from "./finderData.js";
import cameraData from "./cameraData.js";
import galleryData from "./galleryData.js";
import binData from "./binData.js";

const appsData = [
    {
        id: 0,
        name: "finder-app",
        isMinimized: false,
        iconSrc: `./assets/folder-solid.svg`,
        script: openFinderApp,
        data: finderData,
        classList: ["app__icons"],
        toolBar: [],
    },
    {
        id: 1,
        name: "chess-app",
        isMinimized: false,
        iconSrc: `./assets/chess-icons/chess-solid.svg`,
        script: openChessApp,
        data: chessData,
        classList: ["app__icons"],
        toolBar: [],
    },
    {
        id: 2,
        name: "camera-app",
        isMinimized: false,
        iconSrc: `./assets/video-solid.svg`,
        script: openCameraApp,
        data: cameraData,
        classList: ["app__icons"],
        toolBar: [],
    },
    {
        id: 3,
        name: "gallery-app",
        isMinimized: false,
        iconSrc: `./assets/image-solid.svg`,
        script: openGalleryApp,
        data: galleryData,
        classList: ["app__icons"],
        toolBar: [],
    },
    {
        id: 4,
        name: "bin-app",
        isMinimized: false,
        iconSrc: `./assets/trash-can-solid.svg`,
        script: openBinApp,
        data: binData,
        classList: ["app__icons"],
        toolBar: [],
    },
];

export default appsData;
