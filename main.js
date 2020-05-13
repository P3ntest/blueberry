// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu} = require('electron')
const ipc = require('electron').ipcMain;
const path = require('path')

let currentFileList = [];

ipc.on('closeApp', function(){
  app.quit();
});

ipc.on('addFiles', function(event, data) {
  //data = JSON.parse(data);
  console.log(data);
  currentFileList = [].concat(currentFileList, data); // Merge two arrays
  event.sender.send('fileListUpdate', currentFileList);
  console.log(currentFileList);
});

let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    },
    frame: false
  })

  //win.openDevTools({detach: true});

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