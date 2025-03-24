import axiosInstance from './axiosInstance';


export const getAllAccountsApi = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get(`payment/invoice/all`)
        return response
    } catch (error) {
        throw error
    }
}


