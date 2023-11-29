export function disableButtons(){
    var buttonsInList = document.querySelectorAll('ul.list-qrs button')
    var checkBox = document.getElementById("batchCheck");
    var buttonInDiv = document.getElementById("btn-write");
    if(checkBox.checked == true) {
      buttonsInList.forEach((button) => {button.disabled = true;});
      buttonInDiv.disabled = true;
      console.log("checked")
    }
}