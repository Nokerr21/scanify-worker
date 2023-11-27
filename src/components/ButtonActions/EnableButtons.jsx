export function enableButtons(){
    var buttonsDelete = document.querySelectorAll('ul.list button.btn-delete')
    var buttonsWrite = document.querySelectorAll('ul.list button.btn-list-write')
    var buttonInDiv = document.getElementById("btn-write");
    buttonsWrite.forEach((button) => {button.disabled = false;});
    buttonsDelete.forEach((button) => {button.disabled = false;});
    buttonInDiv.disabled = false;
}