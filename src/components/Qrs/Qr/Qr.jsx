import './Qr.css'

export function Qr({ id, title, batchNumber, writeTag, deleteQr, logSelectedQr, disableButtons, setQrs }){
    return (
        <li>
            <pre className="litem">
                {title}
            </pre>
            <div className='button-row'>
                <button onClick={() => deleteQr({ id, setQrs })} className="btn-delete">Delete</button>
                <button id="writeButtonList" onClick={() => {logSelectedQr(title) ; writeTag(title, batchNumber); disableButtons()}} className="btn-list-write">Write to NFC</button>
            </div>
        </li>
    );
}