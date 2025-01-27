import axios from 'axios';
import baseUrl from './base-url';

export const adminLoginApi = async (data: any): Promise<any> => {
    try {
        const response = await axios.post(`${baseUrl}/admin/login`, data)
        return response
    } catch (error) {
        throw error
    }
}