import axios from "axios";


const apiClient = axios.create({
    baseURL: "http://localhost:5000",
    timeout: 1000,
    withCredentials: true
});

export const login = async (data) => {
    try {
        return await apiClient.post("/login", data);
    } catch (error) {
        return {
            isError: true,
            error
        };
    }
};

export const signup = async (data) => {
    try {
        return await apiClient.post("/signup", data);
    } catch (error) {
        return {
            isError: true,
            error
        };
    }
};

