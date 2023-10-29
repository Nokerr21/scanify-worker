export function deleteQr({ id, setQrs }){
    setQrs(currentQRs => {
        return currentQRs.filter(QR => QR.id !== id)
    })
}