let toastTimer = null;
export const showToast = (message, t) => {

    let alert = document.getElementById("toast");

    if (alert == null) {
        alert = document.createElement("div");
        alert.id = "toast";
        alert.className = "fd";
        alert.innerText = message;
    } else {
        alert.style.opacity = 0.9;
    }
    document.body.appendChild(alert);
    t = t ? t : 1000;
    toastTimer = setTimeout(function () {
        hideToast();
    }, t);
}
const hideToast = () => {
    let alert = document.getElementById("toast");
    if (alert != null) {
        document.body.removeChild(alert);
        clearTimeout(toastTimer);
    }
}
