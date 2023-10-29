export default function QrScannerComponent() {
    return (
        <div className="form-row">
            <label>READ QR CODE</label>
            <div id="readerQR"></div>
            <pre className="log" id="logQrScanRes"></pre>
        </div>
    );
}