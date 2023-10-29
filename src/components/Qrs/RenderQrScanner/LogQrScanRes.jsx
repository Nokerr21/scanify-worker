export function logQrScanRes(props) {
    var logElement = document.getElementById('logQrScanRes');
    logElement.innerHTML = ""
    logElement.innerHTML += props + '\n';
}