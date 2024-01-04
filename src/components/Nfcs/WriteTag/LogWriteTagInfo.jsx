export function logWriteTagInfo(props) {
    var logElement = document.getElementById('logWriteTagTest');
    logElement.innerHTML = ""
    logElement.innerHTML += props + '\n';
}