export const handleApiError = (error: any) => {
    console.error("API Error:", error);

    if (error.response) {
        // Server responded with an error
        const { status, data } = error.response;

        if (status === 400) {
            // Validation or bad request error
            return "Validation error occurred.";
        } else if (status >= 500) {
            // Server-side error
            return "Server error. Please try again later.";
        } else {
            // Other server errors
            return data.message || "Something went wrong";
        }
    } else if (error.request) {
        // No response from the server (network error)
        return "Network error. Please check your connection.";
    } else {
        // Unexpected client-side error
        return "Internal server error. Please try again later.";
    }
};
