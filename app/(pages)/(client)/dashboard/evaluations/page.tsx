import PrivateRoute from "@/app/_components/PrivateRoute/PrivateRoute"
import Evaluations from "./Evaluations"


export default function EvaluationsPage() {
  return (
    <PrivateRoute>
      <main className="w-full h-full p-0 m-0">
        <Evaluations />
      </main>
    </PrivateRoute>
  )
}
