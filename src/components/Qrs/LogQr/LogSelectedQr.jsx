export function logSelectedQr(props) {
    var logElement = document.getElementById('logSelectedQr');
    logElement.innerHTML = ""
    logElement.innerHTML += "<span style='font-family: Ubuntu, Arial, Helvetica, sans-serif;  font-weight: bold; font-size: 17.5px;'>Selected QR code:</span>" + " " + props + '\n';
}