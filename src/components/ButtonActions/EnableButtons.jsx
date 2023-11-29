export function enableButtons(){
    var buttonsDelete = document.querySelectorAll('ul.list-qrs button')
  
    var buttonInDiv = document.getElementById("btn-write");
    buttonsDelete.forEach((button) => {button.disabled = false;});
 
    buttonInDiv.disabled = false;
    console.log('enable');
}