import { API } from '../utils/config';
import axios from 'axios';

export const createCategory = (token, data) => {
    return axios.post(`http://${API}/category`, data, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
}

export const createProduct = (token, data) => {
    return axios.post(`http://${API}/product`, data, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
}

export const getCategories = () => {
    return axios.get(`http://${API}/category`)
}