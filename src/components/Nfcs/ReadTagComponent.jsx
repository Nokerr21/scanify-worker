import readTag from "./ReadTag/ReadTag";
import "./ReadTagComponent.css";
import readTagTest from "./ReadTag/ReadTagTest";


export function ReadTagComponent() {
    return (
        <div className="row">
            <label className="labl-read">READ NFC</label>
            <button onClick={() => readTagTest()} className="btn">Read</button>
            <div className="log-read-div">
                <pre className="log-test" id="logReadTagTest"></pre>
                <pre className="log" id="logReadTag"></pre>
            </div>
        </div>
    );
}