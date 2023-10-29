import readTag from "./ReadTag/ReadTag";


export function ReadTagComponent() {
    return (
        <div className="form-row">
            <label>READ NFC</label>
            <button onClick={() => readTag()} className="btn">READ</button>
            <pre className="log" id="logReadTag"></pre>
        </div>
    );
}