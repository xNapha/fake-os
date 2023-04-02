const currentTime = () => {
    // call clock tag in html
    const clock = document.querySelector(".utility__clock");
    // split Date() constructor into an arr
    const currDate = new Date().toUTCString();
    const currDateArr = currDate.split(/[ ,]/);
    // seperate needed information into different categories
    const day = currDateArr[0];
    const date = currDateArr[2];
    const month = currDateArr[3];
    // obtain current time
    const currTime = new Date().toLocaleTimeString().substring(0);

    clock.innerHTML = `<p>${day} ${date} ${month} ${currTime}</p>`;
};
export default currentTime;
