export const handleApiError = (error: any): string => {
    console.error("API Error:", error);

    if (error.response) {
        // The request was made and the server responded with a status code
        const { status, data } = error.response;

        switch (status) {
            case 400:
                return data.message || "Validation error occurred";
            case 401:
                return "Unauthorized. Please log in again.";
            case 403:
                return "Forbidden. You do not have permission to perform this action.";
            case 404:
                return "Resource not found. Please check the URL or contact support.";
            case 408:
                return "Request timeout. The server took too long to respond.";
            case 429:
                return "Too many requests. Please slow down and try again later.";
            case 500:
                return "Internal server error. Please try again later.";
            case 502:
                return "Bad gateway. The server received an invalid response from an upstream service.";
            case 503:
                return "Service unavailable. The server is temporarily overloaded or under maintenance.";
            case 504:
                return "Gateway timeout. The server took too long to respond.";
            default:
                return data.message || "An unexpected error occurred. Please try again.";
        }
    } else if (error.request) {
        // The request was made but no response was received
        if (error.code === "ECONNABORTED") {
            return "Request timed out. Please try again.";
        }
        return "Network error. Please check your internet connection.";
    } else {
        // Something happened in setting up the request that triggered an error
        if (error.message.includes("Network Error")) {
            return "Network error. The server may be down or unreachable.";
        }
        return "An unexpected error occurred. Please try again later.";
    }
};
