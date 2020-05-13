const express = require('express');

const path = require("path");

const publicDir = path.join(__dirname + "/public");

class ExpressManager {
    app;
    server;
    running = false;
    password = null;

    filelist = [];

    constructor() {

    }

    open(port, password, filelist) {
        this.filelist = this.filelist
        if (this.running == false) {
            this.app = express();
            if (password != null) {
                this.password = password;
                this.app.get("/", (req, res) => {
                    res.sendFile(path.join(__dirname, "/publicHidden/login.html"));
                });

                this.app.post("/", (req, res) => {
                    res.send
                });
            } else {
                this.password = null;
            }


            this.server = this.app.listen(port);
            this.running = true;
            this.app.use(express.static(publicDir));
        }
    }

    close() {
        if (this.running != false) {
            this.server.close();
        }
    }
}


function createInstance() {
    return new ExpressManager();
}
module.exports = createInstance;