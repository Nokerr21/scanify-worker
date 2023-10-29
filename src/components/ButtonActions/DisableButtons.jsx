export function disableButtons(){
    var buttons = document.querySelectorAll('ul.list button.btn')
    var checkBox = document.getElementById("batchCheck");
    var buttonInDiv = document.getElementById("btn-write");
    if(checkBox.checked == true) {
      buttons.forEach((button) => {button.disabled = true;});
      buttonInDiv.disabled = true;
    }
}