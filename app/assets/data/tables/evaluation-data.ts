import { Performance } from "./enums/employsEvaluation.enum"


export interface Data {
  id: number
  employeeId: number
  employeeName: string
  performance: string
  comments: string
  date: string
  rating: number
}

export const rows: Data[] = [
  {
    id: 1,
    employeeId: 1,
    employeeName: "Mario Casas",
    performance: Performance.MEDIUM,
    comments: "Desempeño medio, necesita mejorar en algunas áreas.",
    date: "10/10/2024",
    rating: 3
  },
  {
    id: 2,
    employeeId: 1,
    employeeName: "Mario Casas",
    performance: Performance.LOW,
    comments: "Desempeño bajo, requiere atención y capacitación.",
    date: "11/10/2024",
    rating: 1
  },
  {
    id: 3,
    employeeId: 1,
    employeeName: "Mario Casas",
    performance: Performance.HIGH,
    comments: "Desempeño alto, excelente trabajo y dedicación.",
    date: "10/10/2024",
    rating: 4
  },
  {
    id: 4,
    employeeId: 2,
    employeeName: "Luis Torrealba",
    performance: Performance.MEDIUM,
    comments: "Desempeño excelente, superó todas las expectativas.",
    date: "11/10/2024",
    rating: 3
  },
  {
    id: 5,
    employeeId: 2,
    employeeName: "Luis Torrealba",
    performance: Performance.HIGH,
    comments: "Desempeño medio, puede mejorar con más esfuerzo.",
    date: "29/11/2024",
    rating: 5
  },
  {
    id: 6,
    employeeId: 3,
    employeeName: "Marcos Perez",
    performance: Performance.LOW,
    comments: "Desempeño bajo, necesita mejorar significativamente.",
    date: "29/11/2024",
    rating: 2
  },
  {
    id: 7,
    employeeId: 3,
    employeeName: "Marcos Perez",
    performance: Performance.MEDIUM,
    comments: "Desempeño alto, muy buen trabajo.",
    date: "12/09/2024",
    rating: 3
  },
  {
    id: 8,
    employeeId: 3,
    employeeName: "Marcos Perez",
    performance: Performance.LOW,
    comments: "Desempeño excelente, trabajo excepcional.",
    date: "11/10/2024",
    rating: 1
  },
  {
    id: 9,
    employeeId: 3,
    employeeName: "Marcos Perez",
    performance: Performance.MEDIUM,
    comments: "Desempeño bueno, buen trabajo y colaborador.",
    date: "21/10/2024",
    rating: 3
  },
  {
    id: 10,
    employeeId: 4,
    employeeName: "Ana Lopez",
    performance: Performance.HIGH,
    comments: "Desempeño excelente, trabajo impecable.",
    date: "21/10/2024",
    rating: 5
  }

]

export interface Column {
    id: keyof Data
    label: string
    status?: string
  }
  
  export const columns: Column[] = [
    { id: "employeeName", label: "Empleado" },
    { id: "performance", label: "Rendimiento" },
    { id: "comments", label: "Comentarios" },
    { id: "rating", label: "Calificación" },
    { id: "date", label: "Fecha" },
  ]