import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.API_URL || 'https://node-nfc-db.onrender.com/api'
});