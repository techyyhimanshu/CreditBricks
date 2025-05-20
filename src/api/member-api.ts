import axiosInstance from "./axiosInstance"

export const addMemberApi = async (data: any): Promise<any> => {
    try {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        const response = await axiosInstance.post(`/member/mr/new`, formData)
        return response
    } catch (error) {
        throw error
    }
}
export const getMemberSearhApi = async (data: any): Promise<any> => {
    try {
        
        const response = await axiosInstance.post(`/member/search`, data)
        return response
    } catch (error) {
        throw error
    }
}

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

export const updateMemberApi = async (data: any,identifier:string): Promise<any> => {
    try {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        const response = await axiosInstance.patch(`/member/mr/${identifier}`, formData)
        return response
    } catch (error) {
        throw error
    }
}