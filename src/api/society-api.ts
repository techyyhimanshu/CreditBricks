import axios from 'axios';
import baseUrl from './base-url';

export const addSocietyApi = async (data: any): Promise<any> => {
    try {
        const response = await axios.post(`${baseUrl}/society/new`, data)
        return response
    } catch (error) {
        throw error
    }
}
export const getAllSocietyApi = async (): Promise<any> => {
    try {
        const response = await axios.get(`${baseUrl}/society/all`)
        return response
    } catch (error) {
        throw error
    }
}
export const updateSocietyApi = async (data: any, id: any): Promise<any> => {
    try {
        const response = await axios.patch(`${baseUrl}/society/${id}`, data)
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
