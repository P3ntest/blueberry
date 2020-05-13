const ipc = require('electron').ipcRenderer;

console.log("index.js started");

document.addEventListener("DOMContentLoaded", evt => {
    document.getElementById("quit-button").addEventListener("click", ev => {
        onQuitClick();
    });
})


function onQuitClick() {
    ipc.send('closeApp', true);
}