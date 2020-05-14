function findGetParameter(parameterName) {
    let result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

document.addEventListener("DOMContentLoaded", evt => {
    if (findGetParameter("error") != null) {
        document.getElementById("password-incorrect").style.display = "block";
    }
});