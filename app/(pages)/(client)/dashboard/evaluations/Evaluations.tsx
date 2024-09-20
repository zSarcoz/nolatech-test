"use client"
import Sidebar from "@/app/_components/Sidebar/Sidebar"
import EvaluationsTable from "./components/EvaluationTable/EvaluationsTable"

export default function Evaluations() {
  return (
    <Sidebar title={"Evaluations"}>
      <EvaluationsTable />
    </Sidebar>
  )
}
