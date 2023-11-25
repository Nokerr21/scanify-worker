import "./QrScannerComponent.css"
import { WriteTagComponent } from "../Nfcs/WriteTagComponent";

export function QrScannerComponent( { QrScanResult } ) {
    return (
        <div className="row-scanner">
            <label className="labl">READ QR CODE</label>
            <div className="reader" id="readerQR"></div>
            <pre className="log-scanner" id="logQrScanRes"></pre>
            <WriteTagComponent QrScanResult={QrScanResult} />
        </div>
    );
}