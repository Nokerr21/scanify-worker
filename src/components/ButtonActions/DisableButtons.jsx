export function disableButtons(){
    var buttonsDelete = document.querySelectorAll('ul.list-qrs button')
    var checkBox = document.getElementById("batchCheck");
    var buttonInDiv = document.getElementById("btn-write");
    if(checkBox.checked == true) {
      buttonsDelete.forEach((button) => {button.disabled = true;});
      buttonInDiv.disabled = true;
      console.log("checked")
    }
}