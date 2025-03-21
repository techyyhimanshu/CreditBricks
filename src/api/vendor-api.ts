import axiosInstance from "./axiosInstance"


export const getVendorForDropDownApi = async () => {
    try {
        const response = await axiosInstance.get(`/vendor/ddl`)
        return response
    } catch (error) {
        throw error
    }
}
export const addNewVendorApi = async (data: any) => {
    try {
        const response = await axiosInstance.post(`/vendor/new`, data)
        return response
    } catch (error) {
        throw error
    }
}
export const getAllVendorApi = async () => {
    try {
        const response = await axiosInstance.get(`/vendor`)
        return response
    } catch (error) {
        throw error
    }
}
export const getVendorDetail = async (identifier:string) => {
    try {
        const response = await axiosInstance.get(`/vendor/${identifier}`)
        return response
    } catch (error) {
        throw error
    }
}