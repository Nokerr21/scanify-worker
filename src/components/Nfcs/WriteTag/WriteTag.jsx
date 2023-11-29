import { enableButtons } from "../../ButtonActions/EnableButtons";
import { logWriteTag } from "./LogWriteTag";
import { logWriteTagTest } from "./LogWriteTagTest";
import { sleep } from "./Sleep";
import axios from "../../../axios";

export default async function writeTag(message, batchNumber, times = 2) {
  var checkBox = document.getElementById("batchCheck");
  if ("NDEFReader" in window) {
    if (times == 2) {
      logWriteTag("");
    }
    const ndef = new NDEFReader();
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
      if (message === null) {
        logWriteTagTest("Oops!");
        logWriteTag("Scan the QR code first.");
      }
      if (checkBox.checked == true){
        logWriteTagTest("Bring the tag near the reader.  Step[1/4]");
        await ndef.write("isAccess");
        logWriteTagTest("Writing tag... Step[2/4]");
        var res = await axios.post('/nfcs', {
          info: message,
          index: index,
          batchNumber: batchNumber,
        })
        var id = res.data._id.toString();
        logWriteTagTest("Writing tag... Step[3/4]");
        await ndef.write(id);
        logWriteTagTest("Success!");
        logWriteTag("Message: '" + message + "' written!" + "\n" + "TimeStamp: " + dateTime + "\n" + "Index: " + index + "\n" + "BatchNumber: " + batchNumber);
        await sleep(1000);
        await writeTag(message, batchNumber);
      }
      else {
        var res = await axios.post('/nfcs', {
          info: message,
          index: index,
        })
        var id = res.data._id.toString();
        logWriteTagTest("Bring the tag near the reader.  Step[1/2]");
        await ndef.write(id);
        logWriteTagTest("Success!");
        logWriteTag("Message: '" + message + "' written!" + "\n" + "TimeStamp: " + dateTime + "\n" + "Index: " + index);
      }
    } catch(error) {
      if (times > 0 && error.name != 'AbortError') {
        if (times == 2) {
          logWriteTag("A tag writing issue occurred! \nTry " + times + " more times.");
        }
        else {
          logWriteTag("A tag writing issue occurred. \nTry " + times + " more time.");
        }
        return await writeTag(message, batchNumber, times - 1);
      }
      if (times == 0 && error.name != 'AbortError') {
        logWriteTagTest("Oops!");
        logWriteTag("Can't write this tag!");
        enableButtons();
      }
    }
  } 
  else {
    logWriteTagTest("Oops!");
    logWriteTag("WebNFC API isn't supported in this browser.");
  }
}