import axios from "axios";

export default instance = axios.create({
    baseURL: process.env.API_URL || 'https://node-nfc-db.onrender.com/api'
});