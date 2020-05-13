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
});