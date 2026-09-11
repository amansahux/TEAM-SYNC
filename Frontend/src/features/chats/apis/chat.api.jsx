import axiosInstance from "../../../app/config/axiosInstance"
export const getMessages = async () => {
    try{
        const messages = await axiosInstance.get
    }catch(error){
        console.log(error)
    }
}