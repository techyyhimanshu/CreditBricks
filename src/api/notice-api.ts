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


export const updateNoticeApi = async (data:any,id:string): Promise<any> => {
    try {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);

        }
        const response = await axiosInstance.patch(`notice/n/${id}`,formData)
        return response
    } catch (error) {
        throw error
    }
}

export const deleteNoticeApi = async (id:string): Promise<any> => {
    try {
        const response = await axiosInstance.delete(`notice/${id}`)
        return response
    } catch (error) {
        throw error
    }
}
