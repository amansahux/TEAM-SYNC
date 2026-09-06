import axiosInstance  from '../../../../app/config/axiosInstance';
export const getAllEmployees = async (page = 1)=>{
    const response = await axiosInstance.get(`/employee?limit=20&page=${page}`);
    return response.data.data;
}