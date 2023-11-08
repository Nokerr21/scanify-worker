import axios from "axios";

export default async function deleteTagInDb(id){
    var checkBox = document.getElementById("batchCheck");
    if ("NDEFReader" in window) {
        if (checkBox.checked == false){
            if(id != ""){
                await axios.delete('https://node-nfc-db.onrender.com/api/nfcs/' + id);
            }
        }
    }
}