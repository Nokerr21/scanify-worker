export function enableButtons(){
    var buttonsInList = document.querySelectorAll('ul.list-qrs button')
    var buttonInDiv = document.getElementById("btn-write");
    buttonsInList.forEach((button) => {button.disabled = false;});
    buttonInDiv.disabled = false;
}