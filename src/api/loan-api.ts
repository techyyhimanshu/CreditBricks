import axiosInstance from "./axiosInstance"

export const getAllLoansApi = async (societyIdentifier?:string): Promise<any> => {
    try {
        const params: any = {};

        if (societyIdentifier) {
            params.society_identifier = societyIdentifier;
        }
        const response = await axiosInstance.get(`/loan/all`,{params})
        return response
    } catch (error) {
        throw error
    }
}


export const addNewLoanApi = async (data: any): Promise<any> => {
    try {
        const formdata = new FormData()
        for (const key in data) {
            formdata.append(key, data[key])
        }

        const response = await axiosInstance.post(`/loan/ln/new`, formdata)
        return response
    } catch (error) {
        throw error
    }
}

export const updateLoanApi = async (data:any,id:string): Promise<any> => {
    try {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);

        }
        const response = await axiosInstance.patch(`loan/ln/${id}`,formData)
        return response
    } catch (error) {
        throw error
    }
}


export const deleteLoanApi = async (id:string): Promise<any> => {
    try {
        const response = await axiosInstance.delete(`loan/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

