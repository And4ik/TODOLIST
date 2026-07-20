import axios from "axios";

const token = 'a153ca08-38e8-45c0-bcfc-348900481ac5'
const apiKey = 'ec6c8902-5e14-480a-ab31-757583b9319a'

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey
    }
})