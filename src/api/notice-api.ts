import axiosInstance from "./axiosInstance"

export const getAllNoticeApi = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get(`notice/all`)
        return response
    } catch (error) {
        throw error
    }
}
