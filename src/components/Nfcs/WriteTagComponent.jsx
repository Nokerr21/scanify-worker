import writeTag from "./WriteTag/WriteTag"


export function WriteTagComponent( { QrScanResult } ) {
    return (
        <div className="form-row">
            <button onClick={() => writeTag(QrScanResult)} className="btn" id="btn-write">WRITE QR TO NFC</button>
            <pre className="log" id="logWriteTagTest"></pre>
            <pre className="log" id="logWriteTag"></pre>
        </div>
    );
}