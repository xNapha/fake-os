import currentTime from "./scripts/dateTime.js";
import appsData from "./data/appData.js";
import { addToDock } from "./scripts/dock.js";
import { renderToolBar } from "./scripts/settingsBar.js";
import settingsBarData from "./data/settingsBarData.js";
import { removeContextMenu } from "./scripts/utility.js";
import { removeSettingsMenu } from "./scripts/settingsBar.js";
// run clock function
currentTime();
//  run clock function at every 1000 milliseconds
setInterval(currentTime, 1000);

appsData.forEach(addToDock);

renderToolBar(settingsBarData);

const mainScreen = document.querySelector(".main-screen");
mainScreen.addEventListener("click", () => {
    removeContextMenu();
    removeSettingsMenu();
});
mainScreen.addEventListener("auxclick", () => {
    removeContextMenu();
    removeSettingsMenu();
});
