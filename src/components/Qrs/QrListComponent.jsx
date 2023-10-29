import { Qr } from "./Qr/Qr";
import { newBatchNumber } from "../BatchNumber/NewBatchNumber";
import { logBatchNumber } from "../BatchNumber/LogBatchNumber";
import { enableButtons } from "../ButtonActions/EnableButtons";
import { disableButtons } from "../ButtonActions/DisableButtons";
import writeTag from "../Nfcs/WriteTag/WriteTag";
import { logSelectedQr } from "./LogQr/LogSelectedQr";
import { deleteQr } from "./DeleteQr/DeleteQr";


export function QrListComponent({ qrs, setQrs, setBatchNumber, batchNumber }) {
    return (
        <div className="classic-row">
            <h1 className="header">SCANNED QR CODES</h1>
            <label>
                <input type="checkbox" id="batchCheck" onClick={() => {setBatchNumber(newBatchNumber()); enableButtons(); logBatchNumber(batchNumber)}}/>
                SERIAL WRITING
            </label>
            <pre className="log-info" id="logSelectedQr"></pre>
            <pre className="log-info" id="logBatchNumber"></pre>
            <ul className="list">
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