import logReadTag from "./LogReadTag";


export default async function readTag() {
  if ("NDEFReader" in window) {
    const ndefReader = new NDEFReader();
    try {
      await ndefReader.scan();
      ndefReader.onreading = event => {
        const decoder = new TextDecoder();
        for (const record of event.message.records) {
          var today = new Date();
          var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
          var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
          var dateTime = date+' '+time;
          logReadTag("---- data ----\n" + decoder.decode(record.data) + "\n" + "TimeStamp: " + dateTime);
        }
      }
    } catch(error) {
      logReadTag(error);
    }
  } 
  else {
    logReadTag("Web NFC is not supported.");
  }
}