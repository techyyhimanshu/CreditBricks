import axios from 'axios';
import axiosInstance from './axiosInstance';
import baseUrl from './base-url';

export const adminLoginApi = async (data: any): Promise<any> => {
    try {
        const response = await axios.post(`${baseUrl}/admin/login`, data, {
            withCredentials: true
        })
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