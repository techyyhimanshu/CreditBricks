import axiosInstance from "./axiosInstance"

export const createNewGatePassApi = async (gatePassData: any): Promise<any> => {
    try {
        const response = await axiosInstance.post(`gatepass/new`, gatePassData)
        return response
    } catch (error) {
        throw error
    }
}
export const updateGatePassApi = async (gatePassData: any, id: string): Promise<any> => {
    try {
        const response = await axiosInstance.patch(`gatepass/${id}`, gatePassData)
        return response
    } catch (error) {
        throw error
    }
}
export const createNewEventApi = async (eventData: any): Promise<any> => {
    try {
        const response = await axiosInstance.post(`event/new`, eventData)
        return response
    } catch (error) {
        throw error
    }
}
export const updateEventApi = async (eventData: any, id: string): Promise<any> => {
    try {
        const response = await axiosInstance.patch(`event/${id}`, eventData)
        return response
    } catch (error) {
        throw error
    }
}
export const createNewEnquiryApi = async (data: any): Promise<any> => {
    try {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);

        }
        const response = await axiosInstance.post(`other-enquiry/new-other-enquiry`, formData)
        return response
    } catch (error) {
        throw error
    }
}
export const updateEnquiryApi = async (data: any, id: string): Promise<any> => {
    try {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);

        }
        const response = await axiosInstance.patch(`other-enquiry/update-other-enquiry/${id}`, formData)
        return response
    } catch (error) {
        throw error
    }
}
export const createNewDocumentSubmissionApi = async (data: any): Promise<any> => {
    try {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);

        }
        const response = await axiosInstance.post(`other-document/new-other-document`, formData)
        return response
    } catch (error) {
        throw error
    }
}
export const updateDocumentSubmissionApi = async (data: any, id: string): Promise<any> => {
    try {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);

        }
        const response = await axiosInstance.patch(`other-document/update-other-document/${id}`, formData)
        return response
    } catch (error) {
        throw error
    }
}
export const createNewOtherApplicationApi = async (data: any): Promise<any> => {
    try {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);

        }
        const response = await axiosInstance.post(`other-other/new-other-other`, formData)
        return response
    } catch (error) {
        throw error
    }
}
export const updateOtherApplicationApi = async (data: any, id: string): Promise<any> => {
    try {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);

        }
        const response = await axiosInstance.patch(`other-other/update-other-other/${id}`, formData)
        return response
    } catch (error) {
        throw error
    }
}
export const getAllGatePassApi = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get(`gatepass/all`)
        return response
    } catch (error) {
        throw error
    }
}
export const getAllVenueApi = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get(`venue/all`)
        return response
    } catch (error) {
        throw error
    }
}
export const getAllApplicationApi = async (societyIdentifier?:string,propertyIdentifier?:string): Promise<any> => {
    try {
        const params: any = {};

        if (societyIdentifier) {
            params.society_identifier = societyIdentifier;
        }
        if (propertyIdentifier) {
            params.property_identifier = propertyIdentifier;
        }
        const response = await axiosInstance.get(`event/applications/all`,{params})
        return response
    } catch (error) {
        throw error
    }
}
export const getSocietyVenueApi = async (id: string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`venue/society/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

export const getApplicationDetailsApi = async (id: string): Promise<any> => {
    try {
        const response = await axiosInstance.get(`event/applications/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

export const deleteApplicationApi = async (id: string): Promise<any> => {
    try {
        const response = await axiosInstance.delete(`event/applications/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

