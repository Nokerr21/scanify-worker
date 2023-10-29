export function enableButtons(){
    var buttons = document.querySelectorAll('ul.list button.btn')
    var buttonInDiv = document.getElementById("btn-write");
    buttons.forEach((button) => {button.disabled = false;});
    buttonInDiv.disabled = false;
}