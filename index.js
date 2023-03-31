import currentTime from "./scripts/dateTime.js";
import { apps } from "./data/appData.js";
import { addToDock } from "./scripts/dock.js";
import { renderToolBar } from "./scripts/settingsBar.js";
import { toolBarData } from "./data/settingsBarData.js";
// run clock function
currentTime();
//  run clock function at every 1000 milliseconds
setInterval(currentTime, 1000);

addToDock(apps);

renderToolBar(toolBarData);
