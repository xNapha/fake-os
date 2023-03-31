import { toolBarData } from "./../data/toolBarData.js";
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
    addDropDown(div, index);
    toolBar.appendChild(div);
};
// iterate through classList array and attach className to div
const addClassList = (div, classList) => {
    classList.forEach((className) => {
        div.classList.add(className);
    });
    return div;
};

const addDropDown = (div, index) => {
    const dropDownMenu = document.querySelector(".tool-bar__drop-down-menu");
    div.addEventListener("click", (e) => {
        e.preventDefault();
        console.log(dropDownMenu);
        console.log(toolBarData[index].name);
    });
    div.addEventListener("mouseleave", (e) => {
        e.preventDefault();
        console.log(dropDownMenu);
        console.log(toolBarData[index].name);
    });
};

const renderDropDownMenu = () => {};
