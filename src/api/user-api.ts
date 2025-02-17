import axios from 'axios';
import baseUrl from './base-url';
import axiosInstance from './axiosInstance';

export const addUserApi = async (data: any): Promise<any> => {
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
export const getUserApi = async (username: string): Promise<any> => {
    try {
        const response = await axios.get(`${baseUrl}/admin/user/${username}`)
        return response
    } catch (error) {
        throw error
    }
}

export const addUserPropertyApi = async (data: any): Promise<any> => {
    try {
        const response = await axios.post(`${baseUrl}/admin/user/property/new`, data)
        return response
    } catch (error) {
        throw error
    }
}
export const getAllUserPropertyApi = async (): Promise<any> => {
    try {
        const response = await axios.get(`${baseUrl}/admin/user/property/all`)
        return response
    } catch (error) {
        throw error
    }
}
export const addUserLoanApi = async (data: any): Promise<any> => {
    try {
        const formData = new FormData();
        console.log("data", data);

        // If data is an array, loop through each item
        if (Array.isArray(data)) {
            // Loop through each loan in the array
            for (const loan of data) {
                console.log("Processing loan:", loan);
                for (const key in loan) {

                    if (key === 'loanFile' && loan[key]) {
                        // Append the file directly if it exists
                        formData.append(key, loan[key]);
                    } else if (typeof loan[key] === 'object' && loan[key] !== null) {
                        // Serialize objects (for nested objects) as JSON strings
                        formData.append(key, JSON.stringify(loan[key]));
                    } else {
                        // Append primitive values (string, number, etc.)
                        formData.append(key, loan[key]);
                    }
                }
            }
        } else {
            // If it's not an array, handle it as a single object
            for (const key in data) {
                if (key === 'loanFile' && data[key]) {
                    formData.append(key, data[key]);
                } else if (typeof data[key] === 'object' && data[key] !== null) {
                    formData.append(key, JSON.stringify(data[key]));
                } else {
                    formData.append(key, data[key]);
                }
            }
        }

        console.log("formData:", formData);

        // Send form data to the API
        const response = await axios.post(`${baseUrl}/admin/user/loan/new`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error in addUserLoanApi:', error);
        throw error;
    }
};



export const getAllUserLoanApi = async (): Promise<any> => {
    try {
        const response = await axios.get(`${baseUrl}/admin/user/loan/all`)
        return response
    } catch (error) {
        throw error
    }
}

export const deleteUserLoanApi = async (username: string, id: number): Promise<any> => {
    try {
        const response = await axios.delete(`${baseUrl}/admin/user/${username}/loan/${id}`)
        return response
    } catch (error) {
        throw error
    }
}

export const geTenantForDropDownApi = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/tenant/ddl`)
        return response
    } catch (error) {
        throw error
    }
}

export const getAllMemberOrTenantsApi = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/member/all`)
        return response
    } catch (error) {
        throw error
    }
}
export const getMemberForDropDownApi = async (): Promise<any> => {
    try {
        const response = await axiosInstance.get(`/member/ddl`)
        return response
    } catch (error) {
        throw error
    }
}