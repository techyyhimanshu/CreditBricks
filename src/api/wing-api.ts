
import axiosInstance from './axiosInstance';

export const addWingApi = async (data: any): Promise<any> => {
    try {
        const response = await axiosInstance.post(`/wing/new`, data)
        return response
    } catch (error) {
        throw error
    }
}
export const getAllWingApi = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/wing/all`)
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
        const response = await axiosInstance.patch(`/wing/${id}`, dataToUpdate)
        return response
    } catch (error) {
        throw error
    }
}
export const deleteWingApi = async (id: number): Promise<any> => {
    try {
        const response = await axiosInstance.delete(`/wing/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

