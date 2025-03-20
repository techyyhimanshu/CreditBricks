import axiosInstance from "./axiosInstance"

export const deleteMemberApi = async (identifier: string): Promise<any> => {
    try {
        const response = await axiosInstance.delete(`/member/${identifier}`)
        return response
    } catch (error) {
        throw error
    }
}
export const getMemberDetailApi = async (identifier: string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/member/${identifier}`)
        return response
    } catch (error) {
        throw error
    }
}