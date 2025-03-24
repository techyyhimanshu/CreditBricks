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

export const updateAnnouncementApi = async (data:any,id:string): Promise<any> => {
    try {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);

        }
        const response = await axiosInstance.patch(`announcement/at/${id}`,formData)
        return response
    } catch (error) {
        throw error
    }
}

export const deleteAnnouncementApi = async (id:string): Promise<any> => {
    try {
        const response = await axiosInstance.delete(`announcement/${id}`)
        return response
    } catch (error) {
        throw error
    }
}
