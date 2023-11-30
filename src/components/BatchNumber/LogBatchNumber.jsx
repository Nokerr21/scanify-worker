export function logBatchNumber(props) {
    var logElement = document.getElementById('logBatchNumber');
    var checkBox = document.getElementById("batchCheck");
    logElement.innerHTML = ""
    if(checkBox.checked == true){
      logElement.innerHTML += "<span style='font-family: Ubuntu, Arial, Helvetica, sans-serif; font-weight: bold; font-size: 17.5px;'>Current batch number:</span>" + " " + props + '\n';
    }
    else{
      logElement.innerHTML = ""
    }
}