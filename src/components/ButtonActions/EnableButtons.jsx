export function enableButtons(){
    var buttonsDelete = document.querySelectorAll('ul.list-qrs button.btn-delete')
    var buttonsWrite = document.querySelectorAll('ul.list-qrs button.btn-list-write')
    var buttonInDiv = document.getElementById("btn-write");
    buttonsWrite.forEach((button) => {button.disabled = false;});
    buttonsDelete.forEach((button) => {button.disabled = false;});
    buttonInDiv.disabled = false;
}