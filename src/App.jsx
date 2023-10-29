import "./styles.css";
import { useEffect, useState } from "react";
import { ReadTagComponent } from "./components/Nfcs/ReadTagComponent";
import NavComponent from "./components/Nav/NavComponent";
import { QrListComponent } from "./components/Qrs/QrListComponent";
import { WriteTagComponent } from "./components/Nfcs/WriteTagComponent";
import { renderQrScanner } from "./components/Qrs/RenderQrScanner/RenderQrScanner";
import { QrScannerComponent } from "./components/Qrs/QrScannerComponent";
import { newBatchNumber } from "./components/BatchNumber/NewBatchNumber";


export default function App(){

  const [QrScanResult, setQrScanResult] = useState("")
  const [QrScanTime, setQrScanTime] = useState("")
  const [batchNumber, setBatchNumber] = useState(newBatchNumber())
  const [QRs, setQRs] = useState(() => {
    const localValue = localStorage.getItem("QRs")
    if (localValue == null) return []
    return JSON.parse(localValue)
  })

  
  useEffect(() =>{
    localStorage.setItem("QRs", JSON.stringify(QRs))
  }, [QRs])
  

  useEffect(() => {
    renderQrScanner(setQRs, setQrScanResult, setQrScanTime)
  }, [QrScanTime])


  function handleSubmit(e) {
    e.preventDefault()
  }


  return (
  <>
    <form onSubmit={handleSubmit} className="new-item-form">
      <NavComponent />
      <ReadTagComponent />   
      <div className="form-div">
        <QrScannerComponent />
        <WriteTagComponent QrScanResult={QrScanResult} />
      </div>
    </form>
    <QrListComponent qrs={QRs} setQrs={setQRs} setBatchNumber={setBatchNumber} batchNumber={batchNumber} />
  </>
  );
}