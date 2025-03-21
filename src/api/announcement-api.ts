import axiosInstance from "./axiosInstance"

export const getAllAnnouncementApi = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get(`announcement/all`)
        return response
    } catch (error) {
        throw error
    }
}

export const createAnnouncementApi = async (data:any): Promise<any> => {
    try {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);

        }
        const response = await axiosInstance.post(`announcement/at/new`,formData)
        return response
    } catch (error) {
        throw error
    }
}
