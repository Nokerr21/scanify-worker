export function enableButtons(){
    var buttonsDelete = document.querySelectorAll('ul.list-qrs button.btn-delete')
    var buttonsWrite = document.querySelectorAll('ul.list-qrs button.btn-list-write')
    var buttonInDiv = document.getElementById("btn-write");
    buttonsDelete.forEach((button) => {button.disabled = false;});
    buttonsWrite.forEach((button) => {button.disabled = false;});
    buttonInDiv.disabled = false;
    console.log('enable');
}