import { useEffect, useState } from "react"
import { Html5QrcodeScanner} from "html5-qrcode"

export function QrCodeScanner() {

    const [scanResult, setScanResult] = useState("")
    const [scanTime, setScanTime] = useState("")
    const [newQR, setNewQR] = useState("")

    function consoleLogQR(data) {
        var logElement = document.getElementById('logQR');
        logElement.innerHTML = ""
        logElement.innerHTML += data + '\n';
    }

    useEffect(() => {

        const html5QrcodeScanner = new Html5QrcodeScanner(
            "readerQR", { fps: 10, qrbox: 250 });

        html5QrcodeScanner.render(onScanSuccess, onScanError);
 
     
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
        var dateTime = date+' '+time;
               
        function onScanSuccess(decodedText, decodedResult) {
            console.log(`Scan result: ${decodedText}`, decodedResult);
            setScanResult(decodedText);
            setScanTime(dateTime);
            consoleLogQR("Message: '" + decodedText + "' decoded!" + "\n" + "TimeStamp: " + dateTime);
            setNewQR(decodedText);
            if (decodedText != ""){
                setQRs((currentQRs) => {
                return [... currentQRs, {id: crypto.randomUUID(), title: decodedText, completed: false}, ]
            })}
            html5QrcodeScanner.clear();
        }
     
        function onScanError(err){
        }
    }, [])

    return (
        <div className="form-row">
            <label>READ QR CODE</label>
            <div id="readerQR"></div>
            <pre className="log" id="logQR"></pre>
        </div>
    )

}