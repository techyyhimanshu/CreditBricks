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
export const getSocietyOwnerApi = async (societyId: number): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/society/${societyId}`)
        return response
    } catch (error) {
        throw error
    }
}
export const updateSocietyApi = async (data: any, id: any): Promise<any> => {
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
        const response = await axiosInstance.patch(`/society/${id}`, formData)
        return response
    } catch (error) {
        throw error
    }
}
export const deleteSocietyApi = async (id: number): Promise<any> => {
    try {
        const response = await axiosInstance.delete(`/society/${id}`)
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
