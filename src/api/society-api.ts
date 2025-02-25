import axiosInstance from './axiosInstance';

export const addSocietyApi = async (data: any): Promise<any> => {
    try {
        const response = await axiosInstance.post(`/society/new`, data)
        return response
    } catch (error) {
        throw error
    }
}
export const getAllSocietyApi = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/society/all`)
        return response
    } catch (error) {
        throw error
    }
}

export const getSocietyDetailsApi = async (identifier: string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/society/${identifier}`)
        return response
    } catch (error) {
        throw error
    }
}
export const getSocietyOwnerApi = async (societyIdentifier: string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/society/${societyIdentifier}`)
        return response
    } catch (error) {
        throw error
    }
}
export const updateSocietyApi = async (data: any, identifier: any): Promise<any> => {
    try {
        const formData = new FormData();
        for (const key in data) {
            if (key === 'paymentQrFile' && data[key]) {
                formData.append(key, data[key]);
            } else if (typeof data[key] === 'object' && data[key] !== null) {
                formData.append(key, JSON.stringify(data[key]));
            } else {
                formData.append(key, data[key]);
            }
        }
        const response = await axiosInstance.patch(`/society/sy/${identifier}`, formData)
        return response
    } catch (error) {
        throw error
    }
}
export const deleteSocietyApi = async (identifier: string): Promise<any> => {
    try {
        const response = await axiosInstance.delete(`/society/${identifier}`)
        return response
    } catch (error) {
        throw error
    }
}

export const getTowersOfSocietyApi = async (id: any): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/society/${id}/towers`)
        return response
    } catch (error) {
        throw error
    }
}

export const getWingsOfSocietyApi = async (id: any): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/society/${id}/wings`)
        return response
    } catch (error) {
        throw error
    }
}

export const getPropertiesOfSocietyApi = async (identifier: string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/society/${identifier}/ddl/properties`)
        return response
    } catch (error) {
        throw error
    }
}
