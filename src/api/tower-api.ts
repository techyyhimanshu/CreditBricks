import axios from "axios"
import baseUrl from "./base-url"


export const getAllTowerApi = async (): Promise<any> => {
    try {
        const response = await axios.get(`${baseUrl}/tower/all`)
        return response
    } catch (error) {
        throw error
    }
}
export const addTowerApi = async (data: any): Promise<any> => {
    try {
        const response = await axios.post(`${baseUrl}/tower/new`, data)
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
        const response = await axios.patch(`${baseUrl}/tower/${id}`, dataToUpdate)
        return response
    } catch (error) {
        throw error
    }
}
export const deleteTowerApi = async (id: number): Promise<any> => {
    try {
        const response = await axios.delete(`${baseUrl}/tower/${id}`)
        return response
    } catch (error) {
        throw error
    }
}
