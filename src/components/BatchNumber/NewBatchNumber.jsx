export function newBatchNumber(){
    var today = new Date();
    var batchNumber = today.getDate().toString() + (today.getMonth()+1).toString() + (today.getYear()-100).toString() + '-' + today.getHours().toString() + today.getMinutes().toString();
    return batchNumber;
}