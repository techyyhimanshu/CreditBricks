import axiosInstance from "./axiosInstance"


export const createNewTermsConditionApi = async (data: any): Promise<any> => {
    try {
        const response = await axiosInstance.post(`term-condition/new`, data)
        return response
    } catch (error) {
        throw error
    }
}
export const updateTermsConditionApi = async (data: any, id: string): Promise<any> => {
    try {
        const response = await axiosInstance.patch(`term-condition/${id}`, data)
        return response
    } catch (error) {
        throw error
    }
}


export const getTermsConditionBySocietyAndTypeApi = async (societyIdentifier:string,id: string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`term-condition/society/${societyIdentifier}/type/${id}`)
        return response
    } catch (error) {
        throw error
    }
}


