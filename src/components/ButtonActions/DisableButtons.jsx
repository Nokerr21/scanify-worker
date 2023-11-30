export function disableButtons(){
    var buttonsInList = document.querySelectorAll('ul.list-qrs button')
    var checkBoxBatch = document.getElementById("batchCheck");
    var checkBoxIndex = document.getElementById("indexCheck");
    var buttonInDiv = document.getElementById("btn-write");
    if(checkBoxBatch.checked == true) {
      buttonsInList.forEach((button) => {button.disabled = true;});
      buttonInDiv.disabled = true;
      checkBoxIndex.disabled = true;
    }
}