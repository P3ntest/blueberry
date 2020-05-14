const express = require('express');

const path = require("path");

const bodyParser = require('body-parser');

const publicDir = path.join(__dirname + "/public");

const ipc = require('electron').ipcMain;

class ExpressManager {
    app;
    server;
    running = false;
    password = null;

    connections = [];

    fileList = [];

    constructor() {

    }

    open(port, password, fileList) {
        if (this.running === false) {
            this.fileList = fileList;
            this.app = express();
            this.app.use(express.json());
            this.app.use(bodyParser.json());
            this.app.use(bodyParser.urlencoded({ extended: false }));


            if (password != null) {
                this.password = password.trim();
                this.app.get("/", (req, res) => {
                    res.sendFile(path.join(__dirname, "/publicHidden/login.html"));
                });

                this.app.post("/", (req, res) => {
                    if (req.body.password === this.password) {
                        this.showFileList(res);
                    } else {
                        res.redirect("/?error=true");
                    }
                });
            } else {
                this.app.get("/", (req, res) => {
                    this.showFileList(res);
                });
                this.password = null;
            }

            this.app.get("/dlf*", (req, res) => {
                let fileId = (req.url.match(/\d+$/) || []).pop();
                console.log("client requesting file: " + fileId);
                this.fileList.forEach(function (file) {
                    console.log(file.id);
                   if (file.id == fileId) {
                       console.log("found file: " + file.path);
                       res.download(file.path);
                   }
                });
            })


            this.server = this.app.listen(port);

            this.server.on('connection', connection => {
                this.connections.push(connection);
                connection.on('close', () => this.connections = this.connections.filter(curr => curr !== connection));
            });

            this.running = true;
            this.app.use(express.static(publicDir));
        }
    }

    close() {
        if (this.running === true) {
            this.connections.forEach(curr => curr.end());

            this.server.close();
            console.log("server close");
            this.running = false;
        }
    }

    showFileList(response) {
        let tempSendFileList = [];
        this.fileList.forEach(file => {
           tempSendFileList.push({id: file.id, name: file.name, size: bytesToSize(file.size)});
        });

        response.render(path.join(__dirname, "/publicHidden/fileDisplay.ejs"), {
            files: this.fileList
        });
    }
}

function bytesToSize(bytes) {
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function createInstance() {
    return new ExpressManager();
}
module.exports = createInstance;