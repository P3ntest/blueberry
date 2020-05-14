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

    filelist = [];

    constructor() {

    }

    open(port, password, filelist) {
        if (this.running === false) {
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
                        res.sendFile(path.join(__dirname, "/publicHidden/fileDisplay.html"));
                        res.send("Jaa");
                    } else {
                        res.redirect("/?error=true");
                    }
                });
            } else {
                this.app.get("/", (req, res) => {
                    res.sendFile(path.join(__dirname, "/publicHidden/fileDisplay.html"));
                    res.send("Jaa");
                });
                this.password = null;
            }


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
}


function createInstance() {
    return new ExpressManager();
}
module.exports = createInstance;