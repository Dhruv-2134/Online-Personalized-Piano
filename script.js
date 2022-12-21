console.log("Welcome to Online Piano");

const pianoKeys = document.querySelectorAll(".piano-keys .key"),
    volumeSlider = document.querySelector(".volume-slider input"),
    keysCheckbox = document.querySelector(".keys-checkbox input");

//by default, audio src is "a" tune.
let allKeys = [],
    audio = new Audio("tunes/a.mp3");

const playTune = (key) => {
    audio.src = `tunes/${key}.mp3`; //passing the audio src based on the key
    audio.play(); //playing audio


    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    // passing audio src based on key pressed
    clickedKey.classList.add("active");
    setTimeout(() => { //removing active class after 150ms from the clicked element
        clickedKey.classList.remove("active");
    }, 150);
}

pianoKeys.forEach(key => {
    //adding data-key value to allKeys array
    allKeys.push(key.dataset.key);
    //calling playTune function with passing data-key value as an argument
    key.addEventListener("click", () =>  playTune(key.dataset.key));
});

const handleVolume = (e) => {
    audio.volume = e.target.value; //passing the range slider value as an audio volume
}

const showHideKeys = () => {
    //toggling hide class from each key on the checkbox click
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

const pressedKey = (e) => {
    //checking if the key pressed is in allKeys array, only call the playTune function
    if (allKeys.includes(e.key)) playTune(e.key);
}

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);