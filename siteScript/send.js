const ipc = require('electron').ipcRenderer;
const fileDialog = require('file-dialog');

document.addEventListener("DOMContentLoaded", evt => {
    document.getElementById("add-file-button").addEventListener("click", ev => {
        addFiles();
    });
});

function addFiles() {
    fileDialog({ multiple: true})
        .then(files => {
            console.log(files);
            ipc.once('fileListUpdate', function(event, response){

            })
            ipc.send('addFiles', files);
        })
}