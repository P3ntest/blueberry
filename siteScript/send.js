const ipc = require('electron').ipcRenderer;
const fileDialog = require('file-dialog');

const xSvg = " <svg class=\"bi bi-x\" width=\"1em\" height=\"1em\" viewBox=\"0 0 16 16\" fill=\"currentColor\"\n" +
    "                             xmlns=\"http://www.w3.org/2000/svg\">\n" +
    "                            <path fill-rule=\"evenodd\"\n" +
    "                                  d=\"M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z\"\n" +
    "                                  clip-rule=\"evenodd\"/>\n" +
    "                            <path fill-rule=\"evenodd\"\n" +
    "                                  d=\"M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z\"\n" +
    "                                  clip-rule=\"evenodd\"/>\n" +
    "                        </svg>";

document.addEventListener("DOMContentLoaded", evt => {
    document.getElementById("add-file-button").addEventListener("click", ev => {
        addFiles();
    });
});

function addFiles() {
    fileDialog({ multiple: true})
        .then(files => {
            ipc.once('fileListUpdate', function(event, fileList){
                let tempFileContainerHtml = "";
                fileList.forEach((file) => {
                    tempFileContainerHtml += constructFile(file);
                });

                console.log(tempFileContainerHtml);

                document.getElementById("file-container").innerHTML = tempFileContainerHtml;
            })

            let tempSend = [];
            for (i = 0; i < files.length; i++) {
                tempSend.push({name: files[i].name, size: files[i].size});
            }
            ipc.send('addFiles', tempSend);
        })
}

function constructFile(file) {
    let name = file.name;

    let maxSize = 32;

    let allowSecondRow = false;

    // if (name.length > maxSize) {
    //     if (allowSecondRow) {
    //         name = file.name.substr(0, maxSize);
    //         name += "<br>";
    //         if (file.name.length > maxSize * 2) {
    //             name += file.name.substr(maxSize, maxSize - 3);
    //             name += "...";
    //         } else {
    //             name += file.name.substr(maxSize, file.name.length - maxSize);
    //         }
    //     } else {
    //         name = file.name.substr(0, maxSize - 3);
    //         name += "...";
    //     }
    // }

    let currentFile = "<div class=\"file\">" +
        "                    <div class=\"file-header-container\">\n" +
        "                        <h1 class=\"file-header\">" + name + "</h1>\n" +
        "                        <p class=\"file-description\">" + bytesToSize(file.size) + "</p>\n" +
        "                    </div>\n" +
        "                    <a href=\"#\" role=\"button\" class=\"button download-button\">\n" +
        xSvg +
        "                    </a>\n" +
        "                </div>";
    return currentFile;
}

function bytesToSize(bytes) {
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}