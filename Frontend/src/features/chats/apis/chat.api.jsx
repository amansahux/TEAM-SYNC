import axiosInstance from "../../../app/config/axiosInstance";

export const getMessages = async (channel = "general") => {
  try {
    const response = await axiosInstance.get("/chat/get-messages", {
      params: { channel },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
