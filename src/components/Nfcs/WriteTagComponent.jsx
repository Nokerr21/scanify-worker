import writeTag from "./WriteTag/WriteTag"
import './WriteTagComponent.css'


export function WriteTagComponent( { QrScanResult } ) {
    return (
        <div className="row-btn-write">
            <button onClick={() => writeTag(QrScanResult)} className="btn-write" id="btn-write">Write QR to NFC</button>
            <pre className="log-write" id="logWriteTagTest"></pre>
            <pre className="log-write" id="logWriteTag"></pre>
        </div>
    );
}