import axiosInstance from "./axiosInstance"

export const addChargeMasterApi = async (data: any): Promise<any> => {
    try {
        const response = await axiosInstance.post(`/charge/new`, data)
        return response
    } catch (error) {
        throw error
    }
}

export const getAllChargeMasterApi = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/charge/all`)
        return response
    } catch (error) {
        throw error
    }
}

export const getChargesOfSocietyApi = async (identifier: string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/charge/all?society_identifier=${identifier}`)
        return response
    } catch (error) {
        throw error
    }
}


export const getChargeDetailsApi = async (identifier: string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/charge/${identifier}`)
        return response
    } catch (error) {
        throw error
    }
}

export const updateChargeMasterApi = async (data:any,id:string): Promise<any> => {
    try {
        const response = await axiosInstance.patch(`charge/${id}`,data)
        return response
    } catch (error) {
        throw error
    }
}


export const deleteChargeMasterApi = async (id:string): Promise<any> => {
    try {
        const response = await axiosInstance.delete(`charge/${id}`)
        return response
    } catch (error) {
        throw error
    }
}