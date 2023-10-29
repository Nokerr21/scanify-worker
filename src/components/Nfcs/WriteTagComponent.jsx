import writeTag from "./WriteTag/WriteTag"


export function WriteTagComponent( {QrscanResult} ) {
    return (
        <div className="form-row">
            <button onClick={() => writeTag(QrscanResult)} className="btn" id="btn-write">WRITE QR TO NFC</button>
            <pre className="log" id="logWriteTagTest"></pre>
            <pre className="log" id="logWriteTag"></pre>
        </div>
    );
}