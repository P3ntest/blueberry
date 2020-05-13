const express = require('express');

const path = require("path");

const publicDir = path.join(__dirname + "/public");

class ExpressManager {
    app;
    server;
    running = false;
    password = null;

    constructor() {
        this.app = express();
    }

    open(port, password) {
        if (this.running == false) {
            if (password != null)
                this.password = password;
            else
                this.password = null;


            this.server = app.listen(port);
            this.running = true;
            app.use(express.static(publicDir));
        }
    }

    close() {
        if (this.running != false) {
            this.server.close();
        }
    }
}

module.exports = ExpressManager;