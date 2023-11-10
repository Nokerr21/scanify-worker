import axios from "axios";

const instance = axios.create({
    baseURL: process.env.API_URL || 'https://node-nfc-db.onrender.com/api'
});

export default instance;