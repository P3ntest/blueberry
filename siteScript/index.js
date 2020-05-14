const ipc = require('electron').ipcRenderer;

document.addEventListener("DOMContentLoaded", evt => {
    document.getElementById("quit-button").addEventListener("click", ev => {
        onQuitClick();
    });
})


function onQuitClick() {
    ipc.send('closeApp', true);
}