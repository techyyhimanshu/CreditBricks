import axiosInstance from './axiosInstance';

export const addPropertyApi = async (data: any): Promise<any> => {
    try {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);

        }
        console.log("formdata", formData)
        const response = await axiosInstance.post(`/property/p/new`, formData)
        return response
    } catch (error) {
        throw error
    }
}
export const getAllPropertyApi = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/property/all`)
        return response
    } catch (error) {
        throw error
    }
}
export const getPropertyOwnerApi = async (propertyId: number): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/property/${propertyId}`)
        return response
    } catch (error) {
        throw error
    }
}
export const updatePropertyApi = async (data: any, id: any): Promise<any> => {
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
        const response = await axiosInstance.patch(`/property/${id}`, formData)
        return response
    } catch (error) {
        throw error
    }
}
export const deletePropertyApi = async (id: number): Promise<any> => {
    try {
        const response = await axiosInstance.delete(`/property/${id}`)
        return response
    } catch (error) {
        throw error
    }
}