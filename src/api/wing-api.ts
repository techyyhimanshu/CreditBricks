import axios from 'axios';
import baseUrl from './base-url';

export const addWingApi = async (data: any): Promise<any> => {
    try {
        const response = await axios.post(`${baseUrl}/wing/new`, data)
        return response
    } catch (error) {
        throw error
    }
}
export const getAllWingApi = async (): Promise<any> => {
    try {
        const response = await axios.get(`${baseUrl}/wing/all`)
        return response
    } catch (error) {
        throw error
    }
}
export const updateWingApi = async (data: any, id: any): Promise<any> => {
    try {
        const dataToUpdate = {
            wingName: data.wingName,
            societyId: data.societyId,
            towerId: data.towerId
        }
        const response = await axios.patch(`${baseUrl}/wing/${id}`, dataToUpdate)
        return response
    } catch (error) {
        throw error
    }
}
export const deleteWingApi = async (id: number): Promise<any> => {
    try {
        const response = await axios.delete(`${baseUrl}/wing/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

