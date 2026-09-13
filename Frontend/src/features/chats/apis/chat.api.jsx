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

export const uploadFile = async (files, channel)=>{
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("channel", channel);

    const response = await axiosInstance.post("/chat/upload", formData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
