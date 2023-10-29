export function logBatchNumber(data) {
    var logElement = document.getElementById('logBatchNumber');
    var checkBox = document.getElementById("batchCheck");
    logElement.innerHTML = ""
    if(checkBox.checked == true){
      logElement.innerHTML += "Current Batch Number: " + data + '\n';
    }
    else{
      logElement.innerHTML = ""
    }
}