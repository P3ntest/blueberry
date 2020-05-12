const remote = require('electron').remote;

console.log("halloaaa");

function onQuitClick() {
    let window = remote.getCurrentWindow();
    window.close();
    document.getElementById("quit-button").innerHTML = "";
    alert("hi");
}