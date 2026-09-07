import axios from "axios";

 const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export default axiosInstance;

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    let orignalReq = error.config;
    if (error?.response?.status === 401 && !orignalReq._retry && orignalReq.url !== "/auth/get-accessToken") {
      orignalReq._retry = true;
      try {
        await axiosInstance.get("/auth/get-accessToken");
        return axiosInstance(orignalReq);
      } catch (retryError) {
        if (window.location.pathname !== "/" && window.location.pathname !== "/register") {
          window.location.href = "/";
        }
        return Promise.reject(retryError);
      }
    }
    
    return Promise.reject(error);
  }
);
