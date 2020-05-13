document.addEventListener("DOMContentLoaded", evt => {
    document.getElementById("use-password-checkbox").addEventListener("click", ev => {
        document.getElementById("password-setting").style.display =
            document.getElementById("use-password-checkbox").checked ? "flex" : "none";
    });
    document.getElementById("password-setting").style.display = "none";

    document.getElementById("custom-port-checkbox").addEventListener("click", ev => {
        document.getElementById("port-setting").style.display =
            document.getElementById("custom-port-checkbox").checked ? "flex" : "none";
    });
    document.getElementById("port-setting").style.display = "none";

    document.getElementById("start-button").addEventListener("click", ev => {
        if (document.getElementById("use-password-checkbox"))
            ipc.send('startHost',
                {usePassword: document.getElementById("use-password-checkbox").checked,
                    password: document.getElementById("password-input").value,
                    usePort: document.getElementById("custom-port-checkbox").checked,
                    port: document.getElementById("port-input").value
                });
    });
});