
import axiosInstance from './axiosInstance';

export const addWingApi = async (data: any): Promise<any> => {
    try {
        const response = await axiosInstance.post(`/wing/new`, data)
        return response
    } catch (error) {
        throw error
    }
}
export const getAllWingApi = async (societyIdentifier?: string): Promise<any> => {
    try {
        const params: any = {}
        if (societyIdentifier) {
            params.society_identifier = societyIdentifier
        }
        const response = await axiosInstance.get(`/wing/all`, { params })
        return response
    } catch (error) {
        throw error
    }
}

export const getTowerWingsApi = async (identifier: string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`tower/${identifier}/wings`)
        return response
    } catch (error) {
        throw error
    }
}
export const updateWingApi = async (data: any, id: any): Promise<any> => {
    try {
        const dataToUpdate = {
            wingName: data.wingName,
            societyIdentifier: data.societyIdentifier,
            towerIdentifier: data.towerIdentifier
        }
        const response = await axiosInstance.patch(`/wing/${id}`, dataToUpdate)
        return response
    } catch (error) {
        throw error
    }
}
export const deleteWingApi = async (identifier: string): Promise<any> => {
    try {
        const response = await axiosInstance.delete(`/wing/${identifier}`)
        return response
    } catch (error) {
        throw error
    }
}

export const getPropertiesOfWing = async (identifier: string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`wing/${identifier}/properties`)
        return response
    } catch (error) {
        throw error
    }
}



