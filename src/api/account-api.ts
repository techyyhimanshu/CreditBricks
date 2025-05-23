import axiosInstance from './axiosInstance';


export const getAllInvoicesApi = async (filters?: any, societyIdentifier?: string): Promise<any> => {
    try {
        const response = await axiosInstance.post(`payment/invoice/all?society_identifier=${societyIdentifier}`, filters)
        return response
    } catch (error) {
        throw error
    }
}

export const getAllReceiptsApi = async (societyIdentifier: string, filters?: any): Promise<any> => {
    try {
        const response = await axiosInstance.post(`payment/receipt/all?society_identifier=${societyIdentifier}`, filters)
        return response
    } catch (error) {
        throw error
    }
}

export const getAllPaymentLogsApi = async (societyIdentifier: string, filters?: any): Promise<any> => {
    try {
        const response = await axiosInstance.post(`payment/payment-log/all?society_identifier=${societyIdentifier}`, filters)
        return response
    } catch (error) {
        throw error
    }
}

export const generateInvoiceApi = async (filters?: any): Promise<any> => {
    try {
        const response = await axiosInstance.post(`payment/generate-invoice`, filters)
        return response
    } catch (error) {
        throw error
    }
}

export const getAllOnlineSelfPaymentApi = async (societyIdentifier: string, filters?: any): Promise<any> => {
    try {
        const response = await axiosInstance.post(`payment/online-self/all?society_identifier=${societyIdentifier}`, filters)
        return response
    } catch (error) {
        throw error
    }
}


