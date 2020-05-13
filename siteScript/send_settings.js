document.addEventListener("DOMContentLoaded", evt => {
    document.getElementById("use-password-checkbox").addEventListener("", ev => {
    document.getElementById("password-setting").style.display =
        document.getElementById("use-password-checkbox").checked ? "default" : "none";
    });
});