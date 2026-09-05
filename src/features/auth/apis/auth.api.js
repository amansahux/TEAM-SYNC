import axiosInstance from "../../../app/config/axiosInstance";

export const RegisterEmployee = async (data) => {
try {
    const response = await axiosInstance.post("/auth/register", data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
