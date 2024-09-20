import { Performance } from "@/app/assets/data/tables/enums/employsEvaluation.enum"
import { Dayjs } from "dayjs"
import { useState } from "react"

export default function useStates() {
  const [performance, setPerformance] = useState<Performance | "">("")
  const [comments, setComments] = useState("")
  const [rating, setRating] = useState<number | null>(null)
  const [date, setDate] = useState<Dayjs | null>(null)

  const handleDateChange = (newDate: Dayjs | null) => {
    setDate(newDate)
  }


  return {
    performance,
    setPerformance,
    comments,
    setComments,
    rating,
    setRating,
    date,
    setDate,
    handleDateChange,
  }
}
