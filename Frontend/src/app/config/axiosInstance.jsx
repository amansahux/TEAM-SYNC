import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export default axiosInstance;

// Flag to prevent multiple redirects happening at the same time
let isRedirecting = false;

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalReq = error.config;

    // Skip refresh logic for auth endpoints that don't need it
    const skipRefreshUrls = ["/auth/login", "/auth/get-accessToken"];
    const shouldSkipRefresh = skipRefreshUrls.some((url) => originalReq.url?.includes(url));

    if (
      error?.response?.status === 401 &&
      !originalReq._retry &&
      !shouldSkipRefresh
    ) {
      originalReq._retry = true;
      try {
        await axiosInstance.get("/auth/get-accessToken");
        return axiosInstance(originalReq);
      } catch (retryError) {
        // Token refresh failed — session is dead, redirect to login
        if (!isRedirecting && window.location.pathname !== "/" && window.location.pathname !== "/register") {
          isRedirecting = true;
          window.location.href = "/";
          // Reset after a delay to allow future redirects if needed
          setTimeout(() => { isRedirecting = false; }, 3000);
        }
        return Promise.reject(retryError);
      }
    }

    return Promise.reject(error);
  }
);
