import axiosInstance from "./axiosInstance"


export const createNewParentEntityApi = async (eventData: any): Promise<any> => {
    try {
        const response = await axiosInstance.post(`parent-society/new-parent-society`, eventData)
        return response
    } catch (error) {
        throw error
    }
}
export const updateParentEntityApi = async (eventData: any, id: string): Promise<any> => {
    try {
        const response = await axiosInstance.patch(`parent-society/update-parent-society/${id}`, eventData)
        return response
    } catch (error) {
        throw error
    }
}

export const getAllParentEntityApi = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get(`parent-society/all`)
        return response
    } catch (error) {
        throw error
    }
}
export const getAllUnassignedChildSocietiesApi = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get(`parent-society//unassigned/child-societies`)
        return response
    } catch (error) {
        throw error
    }
}


export const getParentEntityDetailsApi = async (id: string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`parent-society/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

export const deleteParentEntityApi = async (id: string): Promise<any> => {
    try {
        const response = await axiosInstance.delete(`parent-society/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

