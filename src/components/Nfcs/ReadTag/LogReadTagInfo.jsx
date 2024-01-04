export default function logReadTagTest(props) {
    var logElement = document.getElementById('logReadTagTest');
    logElement.innerHTML = ""
    logElement.innerHTML += props + '\n';
}