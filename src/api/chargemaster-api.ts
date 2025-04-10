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

export const updateChargeMasterApi = async (data:any,id:string): Promise<any> => {
    try {
        const response = await axiosInstance.patch(`charge/cg/${id}`,data)
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