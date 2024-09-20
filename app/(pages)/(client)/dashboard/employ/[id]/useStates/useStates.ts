"use client"

import { useParams } from "next/navigation"
import useNolaStore from "@/app/(pages)/(store)/nolaStore"

export default function useStates() {
  const { id } = useParams()
  const employs = useNolaStore((state) => state.employees)
  const evaluations = useNolaStore((state) => state.evaluations)
  
  const employ = employs.filter((employ) => employ.id === Number(id))

  const evaluationHistory = evaluations.filter((eva)=>eva.employeeId === Number(id))

  return {
    employ,
    evaluationHistory
  }
}
