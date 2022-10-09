import { API } from '../utils/config';
import axios from 'axios';

export const getProducts = (sortBy, order, limit) => {
    return axios.get(`http://${API}/product?sortBy=${sortBy}&order=${order}&limit=${limit}`)
}

export const getProductDetails = (id) => {
    return axios.get(`http://${API}/product/${id}`)
}

export const getCategories = () => {
    return axios.get(`http://${API}/category`)
}

export const getFilteredProducts = (skip, limit, filters = {}, order, sortBy) => {
    const data = {
        order: order,
        sortBy: sortBy,
        limit: limit,
        skip: skip,
        filters: { ...filters }
    }
    return axios.post(`http://${API}/product/filter`, data, {
        headers: {
            "Content-Type": "application/json"
        }
    })
}