import {create} from 'zustand';
import { rows, Data } from '../../assets/data/tables/employes-data';
import { EvaluationStatus } from '@/app/assets/data/tables/enums/employsEvaluation.enum';
import { rows as evaluations } from '@/app/assets/data/tables/evaluation-data';


interface Evaluation {
  id: number;
  employeeId: number;
  employeeName: string
  performance: string;
  comments: string;
  rating: number;
  date: string
  
}

interface EvaluationStore {
  employees: Data[];
  evaluations: Evaluation[];
  addEmployee: (employee: Data) => void;
  editEmployee: (employee: Data) => void;
  deleteEmployee: (employeeId: number) => void;
  addEvaluation: (evaluation: Evaluation) => void;
  editEvaluation: (evaluation: Evaluation) => void;
  deleteEvaluation: (evaluationId: number) => void;
  loadEmployees: (employees: Data[]) => void;
  updateEmployeeEvaluation: (email: string, evaluation: EvaluationStatus) => void;
}

const useNolaStore = create<EvaluationStore>((set) => ({
  employees: rows,
  evaluations: evaluations,
  addEmployee: (employee) => set((state) => ({ employees: [...state.employees, employee] })),
  editEmployee: (employee) => set((state) => ({
    employees: state.employees.map((emp) => (emp.id === employee.id ? employee : emp)),
  })),
  deleteEmployee: (employeeId) => set((state) => ({
    employees: state.employees.filter((emp) => emp.id !== employeeId),
  })),
  addEvaluation: (evaluation) =>
    set((state) => ({
      evaluations: [
        ...state.evaluations,
        { ...evaluation, id: state.evaluations.length + 1 }, // add new id
      ],
    })),
  editEvaluation: (evaluation) => set((state) => ({
    evaluations: state.evaluations.map((e) => (e.id === evaluation.id ? evaluation : e)),
  })),

  deleteEvaluation: (evaluationId) =>
    set((state) => {
      const evaluationToDelete = state.evaluations.find((e) => e.id === evaluationId);
      return {
        evaluations: state.evaluations.filter((e) => e.id !== evaluationId),
        employees: state.employees.map((emp) =>
          emp.id === evaluationToDelete?.employeeId
            ? { ...emp, evaluation: EvaluationStatus.NOTEVALUATED }
            : emp
        ),
      };
    }),
  loadEmployees: (employees) => set(() => ({ employees })),
  
  updateEmployeeEvaluation: (email, evaluation) =>
    set((state) => ({
      employees: state.employees.map((emp) =>
        emp.email === email ? { ...emp, evaluation: EvaluationStatus.EVALUATED } : emp
      ),
    })),

}));


export default useNolaStore;