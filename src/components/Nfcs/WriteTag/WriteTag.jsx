import { enableButtons } from "../../ButtonActions/EnableButtons";
import { logWriteTag } from "./LogWriteTag";
import { logWriteTagTest } from "./LogWriteTagTest";
import { sleep } from "./Sleep";
import axios from "../../../axios";

export default async function writeTag(message, batchNumber, times = 2) {
  var checkBoxBatch = document.getElementById("batchCheck");
  var checkBoxIndex = document.getElementById("indexCheck");
  var checkStopWrite = document.getElementById("stopWriteCheck");
  if (checkStopWrite.checked == true && checkBoxBatch.checked == false) {

  }
  else {

    if ("NDEFReader" in window) {
      if (times == 2) {
        logWriteTag("");
      }
      const ndef = new NDEFReader();
      if (message === undefined) {
        logWriteTagTest("Oops!");
        logWriteTag("Scan the QR code first.");
      }
      else{
        try {
          var today = new Date();
          var date = today.getDate() + '-' + (today.getMonth()+1) + '-' + today.getFullYear();
          var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          var dateTime = date + ' ' + time;
          if (checkBoxIndex.checked == true) {
            var index = ""
            const digits = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
            const indexLength = 10
            for (let iter = 0; iter < indexLength; iter++) {
              let randNum = Math.floor(Math.random() * digits.length);
              index += digits.substring(randNum, randNum + 1);
            }
            if (checkBoxBatch.checked == true){
              logWriteTagTest("Bring the tag near the reader.  Step[1/4]");
              await ndef.write("isAccess");
              logWriteTagTest("Writing tag... Step[2/4]");
              var res = await axios.post('/nfcs', {
                info: message,
                timeStamp: dateTime,
                index: index,
                batchNumber: batchNumber,
              })
              var id = res.data._id.toString();
              logWriteTagTest("Writing tag... Step[3/4]");
              await ndef.write(id);
              logWriteTagTest("Success!");
              logWriteTag("Written information:\n" + message +  "\n" + "Index: " + index + "\n" + "Batch number: " + batchNumber + "\n" + "Written at: " + dateTime);
              await sleep(1000);
              await writeTag(message, batchNumber);
            }
            else {
              var res = await axios.post('/nfcs', {
                info: message,
                timeStamp: dateTime,
                index: index,
              })
              var id = res.data._id.toString();
              logWriteTagTest("Bring the tag near the reader.  Step[1/2]");
              await ndef.write(id);
              logWriteTagTest("Success!");
              logWriteTag("Written information:\n" + message  + "\n" + "Index: " + index + "\n" + "Written at: " + dateTime);
            }
          }
          else {
            if (checkBoxBatch.checked == true){
              logWriteTagTest("Bring the tag near the reader.  Step[1/4]");
              await ndef.write("isAccess");
              logWriteTagTest("Writing tag... Step[2/4]");
              var res = await axios.post('/nfcs', {
                info: message,
                timeStamp: dateTime,
                batchNumber: batchNumber,
              })
              var id = res.data._id.toString();
              logWriteTagTest("Writing tag... Step[3/4]");
              await ndef.write(id);
              logWriteTagTest("Success!");
              logWriteTag("Written information:\n" + message + "\n" + "Batch number: " + batchNumber + "\n" + "Written at: " + dateTime);
              await sleep(1000);
              await writeTag(message, batchNumber);
            }
            else {
              var res = await axios.post('/nfcs', {
                info: message,
                timeStamp: dateTime,
              })
              var id = res.data._id.toString();
              logWriteTagTest("Bring the tag near the reader.  Step[1/2]");
              await ndef.write(id);
              logWriteTagTest("Success!");
              logWriteTag("Written information:\n" + message + "\n" + "Written at: " + dateTime);
            }
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
    } 
    else {
      logWriteTagTest("Oops!");
      logWriteTag("WebNFC API isn't supported in this browser.");
    }

  }

}