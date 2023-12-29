import "./ReadTagComponent.css";
import readTag from "./ReadTag/ReadTag";


export function ReadTagComponent() {
    return (
        <div className="row">
            <label className="labl-read">READ NFC</label>
            <button onClick={() => readTag()} className="btn">Read</button>
            <div className="log-read-div">
                <pre className="log-test" id="logReadTagTest"></pre>
                <pre className="log" id="logReadTag"></pre>
            </div>
        </div>
    );
}