import axios from "axios";
import { API } from "../utils/config";

export const addToCart = (token, cartItem) => {
    return axios.post(`http://${API}/cart`, cartItem, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    })
}

export const getCartItems = (token) => {
    return axios.get(`http://${API}/cart`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    })
}

export const updateCartItems = (token, cartItem) => {
    return axios.put(`http://${API}/cart`, cartItem, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    })
}

export const deleteCartItem = (token, cartItem) => {
    return axios.delete(`http://${API}/cart/${cartItem._id}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
}

export const getProfile = (token) => {
    return axios.get(`http://${API}/profile`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
}

export const updateProfile = (token, data) => {
    return axios.post(`http://${API}/profile`, data, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    })
}