const path = require('path')
const expressManager = new require(path.join(__dirname, "/express-manager.js"))();
const {app, BrowserWindow, Menu} = require('electron')
const ipc = require('electron').ipcMain;
const ip = require("ip");
let currentFileList = [];

let currentFileId = 0;

ipc.on('closeApp', function () {
    app.quit();
});

let currSendingSettings = {
    usePassword: false,
    password: "",
    usePort: false,
    port: 80
}


ipc.on('addFiles', function (event, data) {
    data.forEach(file => {
        file.id = currentFileId;
        currentFileId++;
    });
    currentFileList = [].concat(currentFileList, data); // Merge two arrays
    event.sender.send('fileListUpdate', currentFileList);
});

ipc.on('startHost', function (event, data) {
    expressManager.open(data.usePort ? data.port : 80, data.usePassword ? data.password : null, currentFileList);
    currSendingSettings = data;
    event.sender.send('runningUpdate', getRunningUpdate());
});

ipc.on('stopHost', function (event, data) {
    expressManager.close();
    event.sender.send('runningUpdate', getRunningUpdate());
});

ipc.on('requestSendingSettingsUpdate', function (event, data) {
    event.sender.send('runningUpdate', getRunningUpdate());
});

function getRunningUpdate() {
    let subData = {}

    if (!expressManager.running) {
        subData = currSendingSettings;
    } else {
        subData =
            {host: ip.address() + (currSendingSettings.usePort ? ":" + currSendingSettings.port : ""),
                password: currSendingSettings.usePassword ? currSendingSettings.password : null};
    }

    let data = {
        running: expressManager.running,
        data: subData
    }

    return data;
}

ipc.on("removeFile", (event, id) => {
    // console.log("id to remove:" + id);
    // let tempFileList = [];
    // currentFileList.forEach((file) => {
    //     tempFileList.push(file);
    // });
    // for (let i = tempFileList.length - 1; i > -1; i--) {
    //     console.log("found id " + tempFileList[i].id + " at pos " + i);
    //     if (tempFileList[i].id == id) {
    //         console.log("removing");
    //         currentFileList.slice(i, 1);
    //     }
    // }
    // console.log(currentFileList);

    currentFileList = currentFileList.filter((currentValue, index, arr) => {
        return currentValue.id != id;
    });

    event.sender.send('fileListUpdate', currentFileList);
});

let win;

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        },
        resizable: false,
        transparent: true,
        frame: false
    });

    win.openDevTools({detach: true});

    win.loadFile('index.html')
}

app.on(`ready`, () => {
    createWindow();

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    Menu.setApplicationMenu(null);
});


app.on('window-all-closed', function () {
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})