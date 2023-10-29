export function logSelectedQr(props) {
    var logElement = document.getElementById('logSelectedQr');
    logElement.innerHTML = ""
    logElement.innerHTML += "Selected QR code: " + props + '\n';
}