import axiosInstance from "./axiosInstance"

export const getApprovalDataApi = async (token: string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/application/token/${token}`)
        return response
    } catch (error) {
        throw error
    }
}