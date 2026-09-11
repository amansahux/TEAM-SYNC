import axiosInstance from "../../../app/config/axiosInstance";
export const getMessages = async () => {
  try {
    const response = await axiosInstance.get("/chat/get-messages");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
