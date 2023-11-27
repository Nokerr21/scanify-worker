import axios from "axios";

const instance = axios.create({
    baseURL: 'https://node-nfc-db.onrender.com/api'
});

export default instance;