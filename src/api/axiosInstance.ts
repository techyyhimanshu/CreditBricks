import axios from "axios";
import baseUrl from "./base-url";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true, // Ensure cookies (refreshToken) are sent
});

// Request Interceptor (Optional: Attach Access Token to Requests)
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = Cookies.get("accessToken");
        if (accessToken) {
            config.headers.authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor (Handles Token Expiry)
axiosInstance.interceptors.response.use(
    (response) => response, // Pass valid responses through
    async (error) => {
        const originalRequest = error.config;

        // Check if the error is due to an expired token (401 Unauthorized)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Prevent infinite loop

            try {
                // Call the refresh token API
                const refreshResponse = await axios.post(`${baseUrl}/admin/refresh-token`, {}, { withCredentials: true });

                // Update the new access token
                const newAccessToken = refreshResponse.data.accessToken;
                // localStorage.setItem("accessToken", newAccessToken);
                Cookies.set("accessToken", newAccessToken);

                // Retry the original request with the new access token
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed", refreshError);
                localStorage.removeItem("accessToken"); // Clear token on failure
                window.location.href = "/"; // Redirect to login page
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
