import { enableButtons } from "../../ButtonActions/EnableButtons";
import { logWriteTag } from "./LogWriteTag";
import { logWriteTagTest } from "./LogWriteTagTest";
import { sleep } from "./Sleep";
import axios from "axios";

const controller = new AbortController();
const signal = controller.signal;

export async function abortWriteTag(){
    controller.abort();
}

export default async function writeTag(message, batchNumber, times = 2) {
  var checkBox = document.getElementById("batchCheck");
  console.log(message);
  //setMess(message);
  if ("NDEFReader" in window) {
    const ndef = new NDEFReader();
    //  const byteSize = str => new Blob([str]).size;
    //  consoleLogWriteTest(byteSize(message))
    try {
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
      var dateTime = date+' '+time;
      var index = ""
      const digits = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
      const indexLength = 10
      for (let iter = 0; iter < indexLength; iter++) {
        let randNum = Math.floor(Math.random() * digits.length);
        index += digits.substring(randNum, randNum + 1);
      }
      if (checkBox.checked == true){
        await ndef.scan();
        var res = await axios.post('https://node-nfc-db.onrender.com/api/nfcs', {
          info: message,
          index: index,
          batchNumber: batchNumber,
          signal: signal
        })
        var id = res.data._id.toString();
        await ndef.write(id);
        logWriteTag("Message: '" + message + "' written!" + "\n" + "TimeStamp: " + dateTime + "\n" + "Index: " + index + "\n" + "BatchNumber: " + batchNumber);
        console.log(message + "@@@@@@@@@@@@@@@@@@@@@@");
        await sleep(1000);
        await writeTag(message, batchNumber);
      }
      else{
        var res = await axios.post('https://node-nfc-db.onrender.com/api/nfcs', {
          info: message,
          index: index,
          signal: signal
        })
        var id = res.data._id.toString();
        await ndef.write(id);
        logWriteTag("Message: '" + message + "' written!" + "\n" + "TimeStamp: " + dateTime + "\n" + "Index: " + index);
      }

    } catch(error) {
      if (times > 0 && error.name != 'AbortError') {
        logWriteTag(error + "\n"+ "Can't write tag! try " + times + " more times!");
        return await writeTag(message, batchNumber, times - 1);
      }
      if (times == 0 && error.name != 'AbortError') {
        logWriteTag(error + "\n"+ "Can't write tag!");
        enableButtons();
      }
      else if(error.name == 'AbortError'){
        logWriteTagTest(error.message)
        enableButtons();
      }
      else{
        logWriteTagTest(error.message)
        enableButtons();
      }
    }
  } 
  else {
    logWriteTag("Web NFC is not supported.");
  }
}