import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.get("/refresh-token", { withCredentials: true });
        return api(originalRequest);
      } catch (err) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
export const login = async(email: string, password: string) => {
    const res = await api.post('/login',{
        email,
        password
    });
    try {        return res.data;
    } catch (err) {
        throw new Error("Login failed");
    }
};

export const register = async(data: {
    name: string;
    email: string;
    DOB: string;
    password: string;
    role: string;
    organisation: string;
}) => {
    const res = await api.post('/register', data);  
    try {
        return res.data;
    }
    catch (err) {
        throw new Error("Registration failed");
    }
};

export const singleJobs = async(id:string) => {
    const res = await api.get(`/students/jobs/${id}`);
    try {
        return res.data;
    }
    catch (err) {
        throw new Error("Failed to fetch jobs");
    }
};