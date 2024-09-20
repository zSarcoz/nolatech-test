// import { QueryClient, QueryClientProvider, useQuery, useMutation } from '@tanstack/react-query';
// import axios from 'axios';

// // Crear una instancia de QueryClient
// const queryClient = new QueryClient();

// // Funciones para obtener datos
// const fetchEmployees = async () => {
//   const { data } = await axios.get('/api/employees');
//   return data;
// };

// const fetchEvaluations = async () => {
//   const { data } = await axios.get('/api/evaluations');
//   return data;
// };

// // Hooks personalizados para usar las consultas
// const useEmployees = () => useQuery(['employees'], fetchEmployees);
// const useEvaluations = () => useQuery(['evaluations'], fetchEvaluations);

// // Hooks personalizados para usar las mutaciones
// const useAddEmployee = () => useMutation((newEmployee) => axios.post('/api/employees', newEmployee), {
//   onSuccess: () => queryClient.invalidateQueries(['employees']),
// });

// const useAddEvaluation = () => useMutation((newEvaluation) => axios.post('/api/evaluations', newEvaluation), {
//   onSuccess: () => queryClient.invalidateQueries(['evaluations']),
// });

// export { queryClient, useEmployees, useEvaluations, useAddEmployee, useAddEvaluation };