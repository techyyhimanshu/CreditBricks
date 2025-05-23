import axiosInstance from "./axiosInstance"


export const getAllTowerApi = async (societyIdentifier?: string): Promise<any> => {
    try {
        const params: any = {}
        if (societyIdentifier) {
            params.society_identifier = societyIdentifier
        }
        const response = await axiosInstance.get(`/tower/all`, { params })
        return response
    } catch (error) {
        throw error
    }
}
export const getSocietyTowersApi = async (identifier: string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`society/${identifier}/towers`)
        return response
    } catch (error) {
        throw error
    }
}

export const getWingsOfTowerApi = async (identifier: string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`tower/${identifier}/wings`)
        return response
    } catch (error) {
        throw error
    }
}
export const addTowerApi = async (data: any): Promise<any> => {
    try {
        const response = await axiosInstance.post(`/tower/new`, data)
        return response
    } catch (error) {
        throw error
    }
}
export const updateTowerApi = async (data: any, id: any): Promise<any> => {
    try {
        const dataToUpdate = {
            towerName: data.towerName,
            societyIdentifier: data.societyIdentifier
        }
        const response = await axiosInstance.patch(`/tower/${id}`, dataToUpdate)
        return response
    } catch (error) {
        throw error
    }
}
export const deleteTowerApi = async (identifier: string): Promise<any> => {
    try {
        const response = await axiosInstance.delete(`/tower/${identifier}`)
        return response
    } catch (error) {
        throw error
    }
}
