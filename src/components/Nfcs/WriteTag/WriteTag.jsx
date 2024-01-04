import { enableButtons } from "../../ButtonActions/EnableButtons";
import { logWriteTag } from "./LogWriteTag";
import { logWriteTagInfo } from "./LogWriteTagInfo";
import { sleep } from "./Sleep";
import axios from "../../../axios";
import { getDateAndTime } from "../../Date/GetDateAndTime";
import { generateNewIndex } from "../../Index/GenerateNewIndex";

export default async function writeTag(message, batchNumber, times = 2) {
  var checkBoxBatch = document.getElementById("batchCheck");
  var checkBoxIndex = document.getElementById("indexCheck");
  if ("NDEFReader" in window) {
    if (times == 2) {
      logWriteTag("");
    }
    const ndef = new NDEFReader();
    if (message === undefined) {
      logWriteTagInfo("Oops!");
      logWriteTag("Scan the QR code first.");
    }
    else{
      try {
        var dateTime = getDateAndTime();
        if (checkBoxIndex.checked == true) {
          var index = generateNewIndex();
          if (checkBoxBatch.checked == true){
            while (checkBoxBatch.checked == true){
              logWriteTagInfo("Bring the tag near the reader.  Step[1/4]");
              await ndef.write("isAccess");
              if (checkBoxBatch.checked == true) {
                logWriteTagInfo("Writing tag... Step[2/4]");
                dateTime = getDateAndTime();
                index = generateNewIndex();
                var res = await axios.post('/nfcs', {
                  info: message,
                  timeStamp: dateTime,
                  index: index,
                  batchNumber: batchNumber,
                })
                var id = res.data._id.toString();
                logWriteTagInfo("Writing tag... Step[3/4]");
                await ndef.write(id);
                await ndef.makeReadOnly();
                logWriteTagInfo("Success!");
                logWriteTag("Written information:\n" + message +  "\n" + "Index: " + index + "\n" + "Batch number: " + batchNumber + "\n" + "Written at: " + dateTime);
                await sleep(1000);
              }
              else {
                logWriteTagInfo("");
                logWriteTag("");
              }
            }
          }
          else {
            var res = await axios.post('/nfcs', {
              info: message,
              timeStamp: dateTime,
              index: index,
            })
            var id = res.data._id.toString();
            logWriteTagInfo("Bring the tag near the reader.  Step[1/2]");
            await ndef.write(id);
            await ndef.makeReadOnly();
            logWriteTagInfo("Success!");
            logWriteTag("Written information:\n" + message  + "\n" + "Index: " + index + "\n" + "Written at: " + dateTime);
          }
        }
        else {
          if (checkBoxBatch.checked == true){
            while (checkBoxBatch.checked == true) {
              logWriteTagInfo("Bring the tag near the reader.  Step[1/4]");
              await ndef.write("isAccess");
              if (checkBoxBatch.checked == true) {
                logWriteTagInfo("Writing tag... Step[2/4]");
                dateTime = getDateAndTime();
                index = generateNewIndex();
                var res = await axios.post('/nfcs', {
                  info: message,
                  timeStamp: dateTime,
                  batchNumber: batchNumber,
                })
                var id = res.data._id.toString();
                logWriteTagInfo("Writing tag... Step[3/4]");
                await ndef.write(id);
                await ndef.makeReadOnly();
                logWriteTagInfo("Success!");
                logWriteTag("Written information:\n" + message + "\n" + "Batch number: " + batchNumber + "\n" + "Written at: " + dateTime);
                await sleep(1000);
              }
              else {
                logWriteTagInfo("");
                logWriteTag("");
              }
            }
          }
          else {
            var res = await axios.post('/nfcs', {
              info: message,
              timeStamp: dateTime,
            })
            var id = res.data._id.toString();
            logWriteTagInfo("Bring the tag near the reader.  Step[1/2]");
            await ndef.write(id);
            await ndef.makeReadOnly();
            logWriteTagInfo("Success!");
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
          logWriteTagInfo("Oops!");
          logWriteTag("Can't write this tag!");
          enableButtons();
        }
      }
    }
  } 
  else {
    logWriteTagInfo("Oops!");
    logWriteTag("WebNFC API isn't supported in this browser.");
  }
}