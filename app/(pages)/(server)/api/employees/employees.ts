import axios from 'axios';

const API_URL = process.env.API_URL;

export const getEmployees = async () => {
  const response = await axios.get(API_URL as string);
  return response.data;
};

export const createEmployee = async (employee) => {
  const response = await axios.post(API_URL as string, employee);
  return response.data;
};

export const updateEmployee = async (id: string, employee) => {
  const response = await axios.put(`${API_URL}/${id}`, employee);
  return response.data;
};

export const deleteEmployee = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};