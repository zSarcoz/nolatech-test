"use client"

import useNolaStore from "@/app/(pages)/(store)/nolaStore"
import { EvaluationStatus, Performance } from "@/app/assets/data/tables/enums/employsEvaluation.enum"
import { Dayjs } from "dayjs"
import { useState } from "react"


export default function useStates() {
  const updateEmployeeEvaluation = useNolaStore(
    (state) => state.updateEmployeeEvaluation
  )

  const handleUpdateEvaluation = (email: string | null) => {
    updateEmployeeEvaluation(email as string, EvaluationStatus.EVALUATED)
  }
  const addEvaluation = useNolaStore((state) => state.addEvaluation)

  const [performance, setPerformance] = useState<Performance | "">("")
  const [comments, setComments] = useState("")
  const [rating, setRating] = useState<number | null>(null)
  const [date, setDate] = useState<Dayjs | null>(null)

  const handleDateChange = (newDate: Dayjs | null) => {
    setDate(newDate)
  }

  const resetStates = () => {
    setPerformance("")
    setComments("")
    setRating(null)
  }

  const areAllFieldsFilled = () => {
    return performance && comments && rating !== null && date !== null
  }
  return {
    addEvaluation,
    performance,
    comments,
    rating,
    date,

    setPerformance,
    setComments,
    setRating,
    setDate,

    updateEmployeeEvaluation,
    handleUpdateEvaluation,
    handleDateChange,
    resetStates,
    areAllFieldsFilled
  }
}
