import axiosInstance from "./axiosInstance"

export const getAllComplaintsApi = async (filters?: any): Promise<any> => {
    try {
        const response = await axiosInstance.post(`/complaint/all`, filters)
        return response
    } catch (error) {
        throw error
    }
}


export const getAllComplainCategoriesApi = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/complaint/categories`)
        return response
    } catch (error) {
        throw error
    }
}


export const getAllPropertiesForDropdownApi = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/property/ddl`)
        return response
    } catch (error) {
        throw error
    }
}

export const addNewComplaintApi = async (data: any): Promise<any> => {
    try {
        const formdata = new FormData()
        for (const key in data) {
            formdata.append(key, data[key])
        }

        const response = await axiosInstance.post(`/complaint/ct/new`, formdata)
        return response
    } catch (error) {
        throw error
    }
}

export const assignComplaintToVendorApi = async (data: any): Promise<any> => {
    try {
        const response = await axiosInstance.post(`/complaint/assign`, data)
        return response
    } catch (error) {
        throw error
    }
}