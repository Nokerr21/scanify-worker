export function QrListItem({ id, title, writeTag, deleteQR }) {
    return (
      <li>
        <pre className="litem">
            {title}
        </pre>
        <button onClick={() => deleteQR(id)} className="btn btn-danger">DELETE</button>
        <button onClick={() => writeTag(title)} className="btn">WRITE TO NFC</button>
      </li>
    )
  }