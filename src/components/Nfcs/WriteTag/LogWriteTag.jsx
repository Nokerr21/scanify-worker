export function logWriteTag(props) {
    var logElement = document.getElementById('logWriteTag');
    logElement.innerHTML = ""
    logElement.innerHTML += props + '\n';
}