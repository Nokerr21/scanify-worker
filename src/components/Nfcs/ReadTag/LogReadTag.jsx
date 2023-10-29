export default function logReadTag(props) {
    var logElement = document.getElementById('logReadTag');
    logElement.innerHTML = ""
    logElement.innerHTML += props + '\n';
}