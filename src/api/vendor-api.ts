import axiosInstance from "./axiosInstance"


export const getVendorForDropDownApi = async () => {
    try {
        const response = await axiosInstance.get(`/vendor/ddl`)
        return response
    } catch (error) {
        throw error
    }
}