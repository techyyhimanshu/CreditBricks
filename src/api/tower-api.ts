import axiosInstance from "./axiosInstance"


export const getAllTowerApi = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/tower/all`)
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
            societyId: data.societyId
        }
        const response = await axiosInstance.patch(`/tower/${id}`, dataToUpdate)
        return response
    } catch (error) {
        throw error
    }
}
export const deleteTowerApi = async (id: number): Promise<any> => {
    try {
        const response = await axiosInstance.delete(`/tower/${id}`)
        return response
    } catch (error) {
        throw error
    }
}
