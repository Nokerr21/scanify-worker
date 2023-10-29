export function logBatchNumber(props) {
    var logElement = document.getElementById('logBatchNumber');
    var checkBox = document.getElementById("batchCheck");
    logElement.innerHTML = ""
    if(checkBox.checked == true){
      logElement.innerHTML += "Current Batch Number: " + props + '\n';
    }
    else{
      logElement.innerHTML = ""
    }
}