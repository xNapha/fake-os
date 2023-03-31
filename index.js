import currentTime from "./scripts/dateTime.js";
import { apps } from "./data/appData.js";
import { addToDock } from "./scripts/dock.js";
import { renderToolBar } from "./scripts/settingsBar.js";
import { toolBarData } from "./data/settingsBarData.js";
// run clock function
currentTime();
//  run clock function at every 1000 milliseconds
setInterval(currentTime, 1000);

try {
    apps.forEach((app) => {
        addToDock(app);
    });
} catch (err) {
    console.warn(err);
}

try {
    renderToolBar(toolBarData);
} catch (err) {
    console.warn(err);
}
