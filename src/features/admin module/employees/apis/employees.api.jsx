import axiosInstance  from '../../../../app/config/axiosInstance';
export const getAllEmployees = async ()=>{
    const response = await axiosInstance.get('/employee?');
    return response.data.data;
}