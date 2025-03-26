
import axiosInstance from './axiosInstance';

export const addTenantApi = async (data: any): Promise<any> => {
    try {
        const response = await axiosInstance.post(`/tenant/tt/new`, data)
        return response
    } catch (error) {
        throw error
    }
}

export const getAllTenantApi = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/tenant/all`)
        return response
    } catch (error) {
        throw error
    }
}

export const getTenantApi = async (identifier : string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/tenant/${identifier}`)
        return response
    } catch (error) {
        throw error
    }
}

export const updateTenantApi = async (data:any , identifier : string): Promise<any> => {
    try {
        const response = await axiosInstance.patch(`/tenant/tt/${identifier}`,data)
        return response
    } catch (error) {
        throw error
    }
}

export const deleteTenantApi = async (identifier: string): Promise<any> => {
    try {
        const response = await axiosInstance.delete(`/tenant/${identifier}`)
        return response
    } catch (error) {
        throw error
    }
}

export const getTenantDetailsApi = async (identifier: string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/tenant/${identifier}`)
        return response
    } catch (error) {
        throw error
    }
}