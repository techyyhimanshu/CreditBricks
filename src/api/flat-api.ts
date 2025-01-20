import axios from 'axios';
import baseUrl from './base-url';

export const addFlatApi = async (data: any): Promise<any> => {
    try {
        const response = await axios.post(`${baseUrl}/flat/new`, data)
        return response
    } catch (error) {
        throw error
    }
}
export const getAllFlatApi = async (): Promise<any> => {
    try {
        const response = await axios.get(`${baseUrl}/flat/all`)
        return response
    } catch (error) {
        throw error
    }
}
export const updateFlatApi = async (data: any, id: any): Promise<any> => {
    try {
        const dataToUpdate = {
            flatNumber: data.flatNumber,
            floorNumber: data.floorNumber,
            towerId: data.towerId
        }
        const response = await axios.patch(`${baseUrl}/flat/${id}`, dataToUpdate)
        return response
    } catch (error) {
        throw error
    }
}
export const deleteFlatApi = async (id: number): Promise<any> => {
    try {
        const response = await axios.delete(`${baseUrl}/flat/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

