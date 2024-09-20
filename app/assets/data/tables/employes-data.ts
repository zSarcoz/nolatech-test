import { EvaluationStatus, Performance } from "./enums/employsEvaluation.enum"

export interface Data {
  id: number
  name: string
  lastname: string
  performance: string
  evaluation: EvaluationStatus
  email: string
  phone: string
  country: string
  address: string
  bussinessEmail: string
  timeWorking: string
  remotePlaceWorking: string
  city: string
  role: string
}

export const rows: Data[] = [
  {
    id: 1,
    name: "Mario Casas",
    lastname: "Salas",
    performance: Performance.HIGH,
    evaluation: EvaluationStatus.NOTEVALUATED,
    email: "msalas@email.com",
    phone: "+58 4243135699",
    country: "Alemania",
    address: "Ciudad de Mexico, Av.Mexico, este 1",
    bussinessEmail: "msalas_b@nolatech.com",
    timeWorking: "+2 años",
    remotePlaceWorking: "Colombia",
    city: "Medellin",
    role: "IT Specialist"
  },
  {
    id: 2,
    name: "Luis Torrealba",
    lastname: "Perez",
    performance: Performance.LOW,
    evaluation: EvaluationStatus.NOTEVALUATED,
    email: "luisp@email.com",
    phone: "+58 4243135100",
    country: "Mexico",
    address: "Cartagena, Av.San Luis, calle 5 este 1",
    bussinessEmail: "luisp_b@nolatech.com",
    timeWorking: "+1 año",
    remotePlaceWorking: "Venezuela",
    city: "Caracas",
    role: "Supervisor "
  },
  {
    id: 3,
    name: "Marcos Perez",
    lastname: "Prieto",
    performance: Performance.MEDIUM,
    evaluation: EvaluationStatus.NOTEVALUATED,
    email: "mp@email.com",
    phone: "+58 4249645611",
    country: "Argentina",
    address: "Medellin, Av.San Carlos, calle 3 norte 2",
    bussinessEmail: "guerra_ana2@nolatech.com",
    timeWorking: "+2 años",
    remotePlaceWorking: "Venezuela",
    city: "Vargas",
    role: "Designer "
  },
  {
    id: 4,
    name: "Ana Lopez",
    lastname: "Guerra",
    performance: Performance.HIGH,
    evaluation: EvaluationStatus.NOTEVALUATED,
    email: "guerra_ana@email.com",
    phone: "+58 4248459660",
    country: "Colombia",
    address: "Cartagena, Av.San Luis, calle 5 este 1",
    bussinessEmail: "guerra_ana2@nolatech.com",
    timeWorking: "+3 años",
    remotePlaceWorking: "Venezuela",
    city: "Caracas",
    role: "Consultant "
  }
]

export interface Column {
  id: keyof Data
  label: string
  status?: string
}

export const columns: Column[] = [
  { id: "name", label: "Employ" },
  { id: "performance", label: "Performance" },
  { id: "evaluation", label: "Evaluation" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "role", label: "Role" }
]
