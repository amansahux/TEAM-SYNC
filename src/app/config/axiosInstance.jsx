import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://team-sync-backend-n78w.onrender.com/api",
  withCredentials: true,
});

export default axiosInstance;

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    let orignalReq = error.config;
    if (error.response.status === 401 && !orignalReq._retry) {
      orignalReq._retry = true;
      try {
        await axiosInstance.get("/auth/get-accessToken");
        return axiosInstance(orignalReq);
      } catch (error) {
        window.location.href("/");
        return Promise.reject(error);
      }
    }
  },
);
