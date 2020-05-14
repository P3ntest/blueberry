document.addEventListener("DOMContentLoaded", evt => {
    document.getElementById("use-password-checkbox").addEventListener("click", ev => {
        updateSwitchCorres();
    });
    document.getElementById("password-setting").style.display = "none";

    document.getElementById("custom-port-checkbox").addEventListener("click", ev => {
        updateSwitchCorres();
    });
    document.getElementById("port-setting").style.display = "none";

    document.getElementById("start-button").addEventListener("click", ev => {
        ipc.once('runningUpdate', function (event, data) {
            updateSettingsPanel(data);
        });
        ipc.send('startHost',
            {
                usePassword: document.getElementById("use-password-checkbox").checked,
                password: document.getElementById("password-input").value,
                usePort: document.getElementById("custom-port-checkbox").checked,
                port: document.getElementById("port-input").value
            });
    });

    document.getElementById("stop-button").addEventListener("click", ev => {
        ipc.once('runningUpdate', function (event, data) {
            updateSettingsPanel(data);
        });
        ipc.send('stopHost', "");
    });

    document.getElementById("post-settings").style.display = "none";

    ipc.once('runningUpdate', function (event, data) {
        updateSettingsPanel(data);
    });
    ipc.send('requestSendingSettingsUpdate', "");
});

function updateSwitchCorres() {
    document.getElementById("password-setting").style.display =
        document.getElementById("use-password-checkbox").checked ? "flex" : "none";
    document.getElementById("port-setting").style.display =
        document.getElementById("custom-port-checkbox").checked ? "flex" : "none";
}

function updateSettingsPanel(data) {
    if (data.running) {
        document.getElementById("post-settings").style.display = "block";
        document.getElementById("pre-settings").style.display = "none";

        if (data.data.password !== null) {
            document.getElementById("info_password_string").innerText = "Password: " + data.data.password;
            document.getElementById("info_password").style.display = "block";
        } else {
            document.getElementById("info_password").style.display = "none";
        }

        document.getElementById("info_address_string").innerText = "Address: " + data.data.host;


        let removeButtons = document.getElementsByClassName("download-button");
        for (let i = 0; i < removeButtons.length; i++) {
            removeButtons[i].disabled = true;
        }
    } else {
        document.getElementById("post-settings").style.display = "none";
        document.getElementById("pre-settings").style.display = "block";

        document.getElementById("use-password-checkbox").checked = data.data.usePassword;
        if (data.data.usePassword)
            document.getElementById("password-input").value = data.data.password;
        document.getElementById("custom-port-checkbox").checked = data.data.usePort;
        if (data.data.usePort)
            document.getElementById("port-input").value = data.data.port;

        let removeButtons = document.getElementsByClassName("download-button");
        for (let i = 0; i < removeButtons.length; i++) {
            removeButtons[i].disabled = false;
        }

        updateSwitchCorres();
    }
}