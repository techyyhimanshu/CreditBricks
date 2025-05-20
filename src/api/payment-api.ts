import axiosInstance from "./axiosInstance"

export const createCashPaymentApi =
    async (amountInFigures: number, invoiceNumber: string, propertyIdentifier: string, notesDetails: any, mobile: string): Promise<any> => {
        try {
            const response = await axiosInstance.post(`payment/cash`, {
                amountInFigures,
                invoiceNumber,
                propertyIdentifier,
                notesDetails,
                paidDate: new Date(),
                mobile
            })
            return response
        } catch (error) {
            throw error
        }
    }

export const createChequePaymentApi =
    async (invoiceNumber: string, bankName: string, chequeDate: Date, chequeIssuedDate: Date, chequeReceivedDate: Date, branchName: string, amountInFigures: number, amountInWords: string,
        propertyIdentifier: string, chequeNumber: string, mobile: string): Promise<any> => {
        try {
            const response = await axiosInstance.post(`payment/cheque`, {
                invoiceNumber,
                bankName,
                chequeDate,
                chequeIssuedDate,
                chequeReceivedDate,
                branchName,
                amountInFigures,
                amountInWords,
                propertyIdentifier,
                chequeNumber,
                mobile
            })
            return response
        } catch (error) {
            throw error
        }
    }

export const verifyPaymentApi =
    async (invoiceNumber: string, amountInFigures: number,
        paidDate: Date, propertyIdentifier: string, transactionId: string, mobileNumber: string, otp: string): Promise<any> => {
        try {
            const response = await axiosInstance.patch(`payment/verify`, {
                invoiceNumber,
                amountInFigures,
                paidDate,
                propertyIdentifier,
                transactionId,
                mobileNumber,
                otp
            })
            return response
        } catch (error) {
            throw error
        }
    }

export const getInvoicePaymentOutstandingApi =
    async (invoiceNumber: string): Promise<any> => {
        try {
            const response = await axiosInstance.get(`payment/get-invoice-outstanding/${invoiceNumber}`)
            return response
        } catch (error) {
            throw error
        }
    }

export const sendOTPApi = async (mobileNumber: string, invoiceNumber: string, propertyIdentifier: string, chequeNumber: string, amountInFigures: number, paymentMethod: string): Promise<any> => {
    try {
        const response = await axiosInstance.post(`payment/resend-otp`, {
            mobileNumber,
            invoiceNumber,
            propertyIdentifier,
            chequeNumber,
            amountInFigures,
            paymentMethod
        })
        return response
    } catch (error) {
        throw error
    }
}