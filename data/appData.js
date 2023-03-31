import { openChessApp } from "../scripts/chessApp.js";
import { openBinApp } from "../scripts/recycleBinApp.js";
import { openFinderApp } from "../scripts/finderApp.js";
import { openCameraApp } from "../scripts/cameraApp.js";
import { openGalleryApp } from "../scripts/galleryApp.js";
import chess from "./chessBoard.js";
import finder from "./finderData.js";
import camera from "./cameraData.js";
import gallery from "./galleryData.js";
import bin from "./binData.js";

export const apps = [
    {
        id: 0,
        name: "finder-app",
        isMinimized: false,
        iconSrc: `./assets/folder-solid.svg`,
        script: openFinderApp,
        data: finder,
        classList: ["app__icons"],
        toolBar: [],
    },
    {
        id: 1,
        name: "chess-app",
        isMinimized: false,
        iconSrc: `./assets/chess-icons/chess-solid.svg`,
        script: openChessApp,
        data: chess,
        classList: ["app__icons"],
        toolBar: [],
    },
    {
        id: 2,
        name: "camera-app",
        isMinimized: false,
        iconSrc: `./assets/video-solid.svg`,
        script: openCameraApp,
        data: camera,
        classList: ["app__icons"],
        toolBar: [],
    },
    {
        id: 3,
        name: "gallery-app",
        isMinimized: false,
        iconSrc: `./assets/image-solid.svg`,
        script: openGalleryApp,
        data: gallery,
        classList: ["app__icons"],
        toolBar: [],
    },
    {
        id: 4,
        name: "bin-app",
        isMinimized: false,
        iconSrc: `./assets/trash-can-solid.svg`,
        script: openBinApp,
        data: bin,
        classList: ["app__icons"],
        toolBar: [],
    },
];
