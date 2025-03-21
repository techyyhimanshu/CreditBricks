import axiosInstance from "./axiosInstance"

export const getAllNoticeApi = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get(`notice/all`)
        return response
    } catch (error) {
        throw error
    }
}

export const createNoticeApi = async (data:any): Promise<any> => {
    try {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);

        }
        const response = await axiosInstance.post(`notice/n/new`,formData)
        return response
    } catch (error) {
        throw error
    }
}
