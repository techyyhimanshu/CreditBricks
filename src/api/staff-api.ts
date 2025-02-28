import axiosInstance from "./axiosInstance"


export const getStaffForDropDownApi = async () => {
    try {
        const response = await axiosInstance.get(`/staff/ddl`)
        return response
    } catch (error) {
        throw error
    }
}