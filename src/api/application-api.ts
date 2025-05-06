import axiosInstance from "./axiosInstance"

export const createNewGatePassApi = async (gatePassData: any): Promise<any> => {
    try {
        const response = await axiosInstance.post(`gatepass/new`, gatePassData)
        return response
    } catch (error) {
        throw error
    }
}
export const createNewEventApi = async (eventData: any): Promise<any> => {
    try {
        const response = await axiosInstance.post(`event/new`, eventData)
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
export const getAllVenueApi = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get(`venue/all`)
        return response
    } catch (error) {
        throw error
    }
}
export const getAllApplicationApi = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get(`event/applications/all`)
        return response
    } catch (error) {
        throw error
    }
}
export const getSocietyVenueApi = async (id:string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`venue/society/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

