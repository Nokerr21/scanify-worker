import writeTag from "./WriteTag/WriteTag"
import './WriteTagComponent.css'
import { disableButtons } from "../ButtonActions/DisableButtons";


export function WriteTagComponent( { QrScanResult } ) {
    return (
        <div className="row-btn-write">
            <button onClick={() => {writeTag(QrScanResult); disableButtons()}} className="btn-write" id="btn-write">Write QR to NFC</button>
            <div className="log-write-div">
                <pre className="log-write-test" id="logWriteTagTest"></pre>
                <pre className="log-write" id="logWriteTag"></pre>
            </div>
            
        </div>
    );
}