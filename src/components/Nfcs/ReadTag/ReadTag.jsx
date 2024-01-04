import logReadTag from "./LogReadTag";
import logReadTagInfo from "./LogReadTagInfo"
import getTagInfo from "./GetTagInfo";

export default async function readTag() {
  if ("NDEFReader" in window) {
    const ndef = new NDEFReader();
    logReadTagInfo("Bring the tag near the reader.  Step[1/3]");
    logReadTag("");
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
          getTagInfo(event);
        }
      }).catch(err => {
        console.log("NFC reading stopped...");
      });
    } catch(error) {
      if (error instanceof Error && error.name === 'AbortError') {
        // return, scanning stopped...
      }
      else {
        logReadTag(error);
      } 
    }
  } else {
    logReadTagInfo("Oops!");
    logReadTag("WebNFC API isn't supported in this browser.");
  }
}