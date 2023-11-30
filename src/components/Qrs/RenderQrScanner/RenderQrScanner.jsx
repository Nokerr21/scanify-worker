import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { logQrScanRes } from "./LogQrScanRes";
import { sleep } from "../../Nfcs/WriteTag/Sleep";

export function renderQrScanner( setQrs, setQrScanResult ){
    const scannerConfig = {
        fps: 15,
        qrbox: 250,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
        rememberLastUsedCamera: false,
        showTorchButtonIfSupported: true,
        aspectRatio: 1.0
    }
    const html5QrcodeScanner = new Html5QrcodeScanner("readerQR", scannerConfig);

    html5QrcodeScanner.render(onScanSuccess);

    async function onScanSuccess(decodedText, decodedResult) {
        var today = new Date();
        var date = today.getDate() + '-' + (today.getMonth()+1) + '-' + today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        console.log(`Scan result: ${decodedText}`, decodedResult);
        setQrScanResult(decodedText);
        logQrScanRes("Decoded information:\n" + decodedText + "\nScanned at:" + dateTime);
        if (decodedText != ""){
            setQrs((currentQRs) => {
              return [... currentQRs, {id: crypto.randomUUID(), title: decodedText, completed: false}, ]
            })
        }
        html5QrcodeScanner.pause();
        await sleep(700);
        html5QrcodeScanner.resume();
    }
}