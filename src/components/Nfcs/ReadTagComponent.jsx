import readTag from "./ReadTag/ReadTag";
import "./ReadTagComponent.css";


export function ReadTagComponent() {
    return (
        <div className="row">
            <label className="labl">READ NFC</label>
            <button onClick={() => readTag()} className="btn">Read</button>
            <pre className="log" id="logReadTag"></pre>
        </div>
    );
}