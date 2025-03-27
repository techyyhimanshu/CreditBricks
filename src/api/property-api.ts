import axiosInstance from './axiosInstance';

export const addPropertyApi = async (data: any): Promise<any> => {
    try {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);

        }
        const response = await axiosInstance.post(`/property/p/new`, formData)
        return response
    } catch (error) {
        console.log(error)
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

export const getWingPropertiesApi = async (identifier:string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`wing/${identifier}/properties`)
        return response
    } catch (error) {
        throw error
    }
}

export const getSinglePropertyDetailsApi = async (propertyId: string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/property/${propertyId}`)
        return response
    } catch (error) {
        throw error
    }
}
export const getTenantOptions = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/tenant/ddl`)
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
export const getPropertComplaintsApi = async (propertyId: string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/property/${propertyId}/complaints`)
        return response
    } catch (error) {
        throw error
    }
}
export const updatePropertyApi = async (data: any, id: any): Promise<any> => {
    try {
       
        const response = await axiosInstance.patch(`/property/${id}`, data)
        return response
    } catch (error) {
        throw error
    }
}
export const deletePropertyApi = async (identifier: string): Promise<any> => {
    try {
        const response = await axiosInstance.delete(`/property/${identifier}`)
        return response
    } catch (error) {
        throw error
    }
}