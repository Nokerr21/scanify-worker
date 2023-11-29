export function enableButtons(){
    var buttonsInList = document.querySelectorAll('ul.list-qrs button')
    var buttonInDiv = document.getElementById("btn-write");
    var checkBox = document.getElementById("batchCheck");
    if(checkBox.checked == false) {
        buttonsInList.forEach((button) => {button.disabled = false;});
        buttonInDiv.disabled = false;
    }
}