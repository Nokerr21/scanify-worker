import logReadTag from "./LogReadTag";
import axios from "../../../axios";
import logReadTagTest from "./LogReadTagTest"

export default async function readTag() {
  if ("NDEFReader" in window) {
    const ndef = new NDEFReader();
    logReadTagTest("Bring the tag close to the reader  Step[1/3]")
    try {
      return new Promise((resolve, reject) => {
        const abortContr = new AbortController();
        abortContr.signal.onabort = reject;
        ndef.addEventListener("reading", event => {
          abortContr.abort();
          resolve(event);
        }, { once: true });
        ndef.scan({ signal: abortContr.signal }).catch(err => reject(err));
        ndef.onreading = event => {
          const decoder = new TextDecoder();
          logReadTagTest("Reading tag... Step[2/3]");
          for (const record of event.message.records) {
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
            var dateTime = date + ' ' + time;
            axios.get('/nfcs/' + decoder.decode(record.data)).then(function(result){
              if(result.data.batchNumber != undefined){
                logReadTagTest("Success!");
                logReadTag("Product information:\n" + result.data.info.toString() + "\n" + "Index: " + result.data.index.toString() +
                "\n" + "Batch number: " + result.data.batchNumber.toString() + "\n" + "TimeStamp: " + dateTime);
              }
              else{
                logReadTagTest("Success!");
                logReadTag("Product information:\n" + result.data.info.toString() + "\n" + "Index: " + result.data.index.toString() +
                "\n" + "TimeStamp: " + dateTime);
              }
              
            }).catch(err => {
              if (err.name == 'TypeError') {
                logReadTagTest("Oops! Tag is not defined in our database");
                logReadTag(decoder.decode(record.data))
              }
              else {
                logReadTagTest("Oops!");
                logReadTag('Something went wrong while connecting to database')
              }
            });
          }
        }
      }).catch(err => {
        console.log("NFC reading stopped...");
      });
      
    } catch(error) {
      if (error instanceof Error && error.name === 'AbortError') {
        // work time expired, just return
      }
      else {
        logReadTag(error);
      }
      
    }
  } else {
    logReadTagTest("Oops!");
    logReadTag("WebNFC API isn't supported in this browser.");
  }
}