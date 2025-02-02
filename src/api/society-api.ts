import axios from 'axios';
import baseUrl from './base-url';
import axiosInstance from './axiosInstance';

export const addSocietyApi = async (data: any): Promise<any> => {
    try {
        const formData = new FormData();
        for (const key in data) {
            if (key === 'paymentQrFile' && data[key]) {
                formData.append(key, data[key]);
            } else if (typeof data[key] === 'object' && data[key] !== null) {
                formData.append(key, JSON.stringify(data[key]));
            } else {
                formData.append(key, data[key]);
            }
        }
        const response = await axios.post(`${baseUrl}/society/new`, formData)
        return response
    } catch (error) {
        throw error
    }
}
export const getAllSocietyApi = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/society/all`)
        return response
    } catch (error) {
        throw error
    }
}
export const updateSocietyApi = async (data: any, id: any): Promise<any> => {
    try {
        const formData = new FormData();
        for (const key in data) {
            if (key === 'paymentQrFile' && data[key]) {
                formData.append(key, data[key]);
            } else if (typeof data[key] === 'object' && data[key] !== null) {
                formData.append(key, JSON.stringify(data[key]));
            } else {
                formData.append(key, data[key]);
            }
        }
        const response = await axios.patch(`${baseUrl}/society/update/${id}`, formData)
        return response
    } catch (error) {
        throw error
    }
}
export const deleteSocietyApi = async (id: number): Promise<any> => {
    try {
        const response = await axios.delete(`${baseUrl}/society/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

export const getTowersOfSocietyApi = async (id: any): Promise<any> => {
    try {
        const response = await axios.get(`${baseUrl}/society/${id}/towers`)
        return response
    } catch (error) {
        throw error
    }
}
