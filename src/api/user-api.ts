import axios from 'axios';
import baseUrl from './base-url';

export const addUserApi = async (data: any): Promise<any> => {
    try {
        const response = await axios.post(`${baseUrl}/admin/user/new`, data)
        return response
    } catch (error) {
        throw error
    }
}
export const getAllUserApi = async (): Promise<any> => {
    try {
        const response = await axios.get(`${baseUrl}/admin/user/all`)
        return response
    } catch (error) {
        throw error
    }
}
export const updateUserApi = async (data: any, id: any): Promise<any> => {
    try {
        const response = await axios.patch(`${baseUrl}/admin/user/${id}`, data)
        return response
    } catch (error) {
        throw error
    }
}
export const deleteUserApi = async (id: number): Promise<any> => {
    try {
        const response = await axios.delete(`${baseUrl}/admin/user/${id}`)
        return response
    } catch (error) {
        throw error
    }
}
export const getUserApi = async (personId: string): Promise<any> => {
    try {
        const response = await axios.get(`${baseUrl}/admin/user/${personId}`)
        return response
    } catch (error) {
        throw error
    }
}

