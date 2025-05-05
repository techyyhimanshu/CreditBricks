import axiosInstance from "./axiosInstance"

export const createNewGatePassApi = async (gatePassData: any): Promise<any> => {
    try {
        const response = await axiosInstance.post(`gatepass/new`, gatePassData)
        return response
    } catch (error) {
        throw error
    }
}
export const getAllGatePassApi = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get(`gatepass/all`)
        return response
    } catch (error) {
        throw error
    }
}
