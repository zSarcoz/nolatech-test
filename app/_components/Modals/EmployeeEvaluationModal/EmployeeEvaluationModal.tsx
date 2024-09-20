import React from "react"
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Rating,
  Box,
  Typography
} from "@mui/material"
import useNolaStore from "@/app/(pages)/(store)/nolaStore"
import { EvaluationStatus } from "@/app/assets/data/tables/enums/employsEvaluation.enum"


interface EvaluationModalProps {
  open: boolean
  onClose: () => void
  employeeId: number
  evaluationId: number
}

const EmployeeEvaluationModal: React.FC<EvaluationModalProps> = ({
  open,
  onClose,
  employeeId,
  evaluationId
}) => {
  const evaluations = useNolaStore((state) => state.evaluations)
  const employees = useNolaStore((state) => state.employees)

  const evaluationSelected = evaluations.filter(
    (test) => test.id === evaluationId
  )

  const employeeEvaluatedSelected = employees.filter((emp)=>emp.id === employeeId)

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      sx={{ width: "90vw", maxWidth: "900px", mx: "auto" }}
    >
      <DialogContent sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <div className="w-full flex flex-col justify-center items-center">
            {employeeEvaluatedSelected[0]?.evaluation !== EvaluationStatus.NOTEVALUATED ? (
              <>
                <h1 className="font-roboto font-bold text-xl mb-5">
                  Evaluacion del Empleado
                </h1>
                <div className="w-full flex flex-col gap-5">
                  <span>
                    <b>Nombre del Empleado:</b>{" "}
                    {evaluationSelected[0]?.employeeName}
                  </span>
                  <span>
                    <b>Rendimiento:</b> {evaluationSelected[0]?.performance}
                  </span>
                  <span>
                    <b>Comentarios:</b> {evaluationSelected[0]?.comments}
                  </span>
                  <span>
                    <b>Calificacion: </b>

                    <Rating
                      name="employee-rating"
                      value={evaluationSelected[0]?.rating}
                      readOnly
                    />
                  </span>
                  <span>
                    <b>Fecha:</b> {evaluationSelected[0]?.date}
                  </span>
                </div>
              </>
            ) : (
              <Typography>No se ha evaluado</Typography>
            )}
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{ backgroundColor: "#035096", color: "white" }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EmployeeEvaluationModal
