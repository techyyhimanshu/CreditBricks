import axiosInstance from "./axiosInstance"

export const getAllCommiteeMembersApi = async (filters?: any): Promise<any> => {
    try {
        const response = await axiosInstance.post(`/complaint/all`, filters)
        return response
    } catch (error) {
        throw error
    }
}

export const addNewCommiteeMemberApi = async (data: any): Promise<any> => {
    try {
        const response = await axiosInstance.post(`/committee-member/new`, data)
        return response
    } catch (error) {
        throw error
    }
}

export const updateCommiteeMemberApi = async (data:any,id:string): Promise<any> => {
    try {
        
        const response = await axiosInstance.patch(`committee-member/${id}`,data)
        return response
    } catch (error) {
        throw error
    }
}


export const deleteCommiteeMemberApi = async (id:string): Promise<any> => {
    try {
        const response = await axiosInstance.delete(`committee-member/${id}`)
        return response
    } catch (error) {
        throw error
    }
}