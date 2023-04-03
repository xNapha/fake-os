import settingsBarData from "./../data/settingsBarData.js";
import { appHeaderControl, createAppContainer, moveApp } from "./utility.js";
export const renderToolBar = (data) => {
    const toolBar = document.querySelector(".tool-bar__settings");
    data.forEach((setting, index) => {
        addSettingToToolBar(toolBar, setting, index);
    });
};
// add the appropriate icon or name to the setting depending on iconSrc being true
const addSettingToToolBar = (toolBar, setting, index) => {
    const div = document.createElement("div");
    if (setting.iconSrc) {
        div.innerHTML = `<img src="${
            setting.iconSrc
        }" class="${setting.classList.join(" ")}">`;
    } else {
        addClassList(div, setting.classList);
        div.innerText = `${setting.name.replace(/[a-z]/, (n) =>
            n.toUpperCase()
        )}`;
    }
    dropDown(div, index);
    toolBar.appendChild(div);
};
// iterate through classList array and attach className to div
const addClassList = (div, classList) => {
    classList.forEach((className) => {
        div.classList.add(className);
    });
    return div;
};

const dropDown = (element, index) => {
    const createDropDown = () => {
        const mainScreen = document.querySelector(".main-screen__allowed-area");

        const div = document.createElement("div");

        div.classList.add("settings-bar-menu");
        div.textContent = settingsBarData[index].dropDownMenu;

        div.addEventListener("click", (e) => {
            e.preventDefault();
            const computerSpecs = settingsBarData[index].computerSpecs;
            if (computerSpecs) {
                mainScreen.append(createAppContainer("specs"));
                const specsInfo = document.querySelector(
                    ".allowed-area__specs"
                );
                moveApp(specsInfo);
                appHeaderControl(specsInfo, computerSpecs);
                openComputerSpecs(computerSpecs);
            }
        });

        mainScreen.append(div);

        const settingsBarMenu = document.querySelector(".settings-bar-menu");

        settingsBarMenu.style.top =
            element.getBoundingClientRect().bottom - 17 + "px";
        settingsBarMenu.style.left =
            element.getBoundingClientRect().left + "px";
    };

    element.addEventListener("click", (event) => {
        event.preventDefault();

        if (document.querySelector(".settings-bar-menu")) {
            document.querySelector(".settings-bar-menu").remove();
            createDropDown();
        } else {
            createDropDown();
        }
    });
};

const openComputerSpecs = (info) => {
    const specs = document.querySelector(".specs__main");

    specs.innerHTML = `
    <ul>
        <li>Name: <span>${info.computerName}</span></li>
        <li>Processor: <span>${info.processor}</span></li>
        <li>Graphics: <span>${info.graphics}</span></li>
        <li>Memory: <span>${info.memory}</span></li>
        <li>Start Up Disk: <span>${info.startUpDisk}</span></li>
        <li>Serial Number: <span>${info.serialNumber}</span></li>
        <li>macOS: <span>${info.macOS}</span></li>
    </ul>
    `;
};

export const removeSettingsMenu = () => {
    const settingsMenu = document.querySelector(".settings-bar-menu");

    if (settingsMenu) {
        settingsMenu.remove();
    }
};
