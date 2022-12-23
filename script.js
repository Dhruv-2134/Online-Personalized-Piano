console.log("Welcome to Online Piano");

const pianoKeys = document.querySelectorAll(".piano-keys .key"),
    volumeSlider = document.querySelector(".volume-slider input"),
    keysCheckbox = document.querySelector(".keys-checkbox input");

const keymap = new Map();
//by default, audio src is "a" tune.
let allKeys = [],
    audio = new Audio("tunes/a.mp3");

const playTune = (key) => {
    console.log(key, "on");
    audio.src = `tunes/${key}.mp3`; //passing the audio src based on the key
    audio.play(); //playing audio
    // audio.onended = () => { //removing active class after audio ends
    //     audio.play();
    // }

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    // passing audio src based on key pressed
    clickedKey.classList.add("active");
    // setTimeout(() => { //removing active class after 150ms from the clicked element
    //     clickedKey.classList.remove("active");
    // }, 150);
}

pianoKeys.forEach(key => {
    //adding data-key value to allKeys array
    allKeys.push(key.dataset.key);
    //calling playTune function with passing data-key value as an argument
    // key.addEventListener("click", () => playTune(key.dataset.key));
    // key.addEventListener("keyup", playKeyUpTune(key.dataset.key));
    // key.addEventListener("keydown", playKeyDownTune(key.dataset.key));
});

document.addEventListener("keyup", (key) => {
    let clicked = document.querySelector(`[data-key="${String.fromCharCode(key.keyCode).toLowerCase()}"]`);
    clicked = clicked.dataset.key;
    console.log(clicked, "up");
    playKeyUpTune(clicked);
});

document.addEventListener("keydown", (key) => {
    console.log(key.repeat);
    if (key.repeat) {
        return; 
    }
    else {
        console.log(String.fromCharCode(key.keyCode));
        let clicked = document.querySelector(`[data-key="${String.fromCharCode(key.keyCode).toLowerCase()}"]`);
        clicked = clicked.dataset.key;
        console.log(clicked, "down");
        playKeyDownTune(clicked);
    }
});

// document.addEventListener("keydown", playKeyDownTune(key.dataset.key));

const handleVolume = (e) => {
    audio.volume = e.target.value; //passing the range slider value as an audio volume
}

const showHideKeys = () => {
    //toggling hide class from each key on the checkbox click
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

// const pressedKey = (e) => {
//     //checking if the key pressed is in allKeys array, only call the playTune function
//     if (allKeys.includes(e.key)) playTune(e.key);
// }

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
// document.addEventListener("keydown", pressedKey);

function playKeyUpTune(key) {
    if (keymap.get(key) == true) {
        playOffTune(key);
    }
    keymap.set(key, false);
}

async function playKeyDownTune(key) {
    if (!keymap.get(key)) {
        playTune(key);
    }
    keymap.set(key, true);
}

async function playOffTune(key) {
    console.log(key, "off");
    audio.onended = () => {};
    await wait(500);
    audio.pause();
    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.remove("active");
}

const wait= async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

