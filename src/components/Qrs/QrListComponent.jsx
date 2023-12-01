import { Qr } from "./Qr/Qr";
import { newBatchNumber } from "../BatchNumber/NewBatchNumber";
import { logBatchNumber } from "../BatchNumber/LogBatchNumber";
import { enableButtons } from "../ButtonActions/EnableButtons";
import { disableButtons } from "../ButtonActions/DisableButtons";
import writeTag from "../Nfcs/WriteTag/WriteTag";
import { logSelectedQr } from "./LogQr/LogSelectedQr";
import { deleteQr } from "./DeleteQr/DeleteQr";
import "./QrListComponent.css";


export function QrListComponent({ qrs, setQrs, setBatchNumber, batchNumber }) {
    
    var checkBoxSerial = document.getElementById("batchCheck");
    var checkStopWrite = document.getElementById("stopWriteCheck");
    
    function checkSameCheckBox () {
        if (checkBoxSerial.checked == true) {
            checkStopWrite.checked = false;
        }
        else {
            checkStopWrite.checked = true;
        }
    }

    return (
        <div className="row-list">
            <label className="labl-list">SCANNED QR CODES</label>
            <div className="checkBoxes-div">
                <label className="serial-label">
                    <input className="checkbox-serial" type="checkbox" id="batchCheck" onClick={() => {setBatchNumber(newBatchNumber()); enableButtons(); logBatchNumber(newBatchNumber()); checkSameCheckBox()}}/>
                    SERIAL WRITING
                    <input className="checkbox-stop-write" type="checkbox" id="stopWriteCheck" />
                </label>
                <label className="index-label">
                    <input className="checkbox-index" type="checkbox" id="indexCheck" />
                    INDEXING
                </label>
            </div>

            <pre className="log-info" id="logSelectedQr"></pre>
            <pre className="log-info" id="logBatchNumber"></pre>
            <ul className="list-qrs">
                {qrs.length === 0 && "No QR codes stored"}
                {qrs.map(qr => {
                return (
                    <Qr
                        {... qr}
                        key={qr.id}
                        batchNumber={batchNumber}
                        writeTag={writeTag}
                        setQrs={setQrs}
                        deleteQr={deleteQr}
                        logSelectedQr={logSelectedQr}
                        disableButtons={disableButtons} 
                    />
                )})}
            </ul>
        </div>
        
    );
}