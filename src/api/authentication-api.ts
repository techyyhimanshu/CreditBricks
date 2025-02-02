import axiosInstance from './axiosInstance';

export const adminLoginApi = async (data: any): Promise<any> => {
    try {
        const response = await axiosInstance.post(`/admin/login`, data)
        return response
    } catch (error) {
        throw error
    }
}

export const adminLogoutApi = async (): Promise<any> => {
    try {
        const response = await axiosInstance.post(`/admin/logout`)
        return response
    } catch (error) {
        throw error
    }
}
export const adminRefreshAccessToken = async (): Promise<any> => {
    try {
        const response = await axiosInstance.post(`/admin/refresh-token`)
        return response
    } catch (error) {
        throw error
    }
}