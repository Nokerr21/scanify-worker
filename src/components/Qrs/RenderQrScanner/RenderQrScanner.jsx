import { Html5QrcodeScanner } from "html5-qrcode";
import { logQrScanRes } from "./LogQrScanRes";

export function renderQrScanner( setQrs, setQrScanResult, setQrScanTime ){
    const html5QrcodeScanner = new Html5QrcodeScanner("readerQR", { fps: 5, qrbox: 250 });
  
    html5QrcodeScanner.render(onScanSuccess, onScanError);
    console.log(html5QrcodeScanner.getState()  + " drugi");
  
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
    var dateTime = date+' '+time;
            
    function onScanSuccess(decodedText, decodedResult) {
        console.log(`Scan result: ${decodedText}`, decodedResult);
        setQrScanResult(decodedText);
        setQrScanTime(dateTime);
        logQrScanRes("Message: '" + decodedText + "' decoded!" + "\n" + "TimeStamp: " + dateTime);
        console.log(decodedText.getBytes)
        if (decodedText != ""){
            setQrs((currentQRs) => {
              return [... currentQRs, {id: crypto.randomUUID(), title: decodedText, completed: false}, ]
            })
        }
        console.log(html5QrcodeScanner.getState()  + " trzeci");
        html5QrcodeScanner.clear();
    }
  
    function onScanError(err){}
}