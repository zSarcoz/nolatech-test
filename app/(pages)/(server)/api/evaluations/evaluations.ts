// src/api/evaluations.ts
import axios from 'axios';

const apiUrl = process.env.API_URL

export const getEvaluations = async () => {
  const response = await axios.get(`${apiUrl}/evaluations`);
  return response.data;
};

export const createEvaluation = async (evaluation) => {
  const response = await axios.post(`${apiUrl}/evaluations`, evaluation);
  return response.data;
};

export const updateEvaluation = async (id: string, evaluation) => {
  const response = await axios.put(`${apiUrl}/evaluations/${id}`, evaluation);
  return response.data;
};

export const deleteEvaluation = async (id: string) => {
  const response = await axios.delete(`${apiUrl}/evaluations/${id}`);
  return response.data;
};