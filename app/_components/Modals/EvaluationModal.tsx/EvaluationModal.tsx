
import React from "react"
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Rating,
  Box,
  Typography
} from "@mui/material"
import {
  Performance
} from "@/app/assets/data/tables/enums/employsEvaluation.enum"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Dayjs } from "dayjs"
import { CalendarMonth } from "@mui/icons-material"

import useStates from "./useStates/useStates"

interface EvaluationModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (evaluationData) => void
  employeeEmail: string | null
  employName: string
  employeeId: number
}

const EvaluationModal: React.FC<EvaluationModalProps> = ({
  open,
  onClose,
  onSubmit,
  employName,
  employeeEmail,
  employeeId
}) => {
  const {
    handleUpdateEvaluation,
    addEvaluation,
    performance,
    comments,
    rating,
    date,

    setPerformance,
    setComments,
    setRating,

    handleDateChange,
    resetStates,
    areAllFieldsFilled
  } = useStates()

  const handleAddEvaluation = () => {
    const newEvaluation = {
      id: employeeId,
      employeeId: employeeId,
      employeeName: employName,
      performance: performance,
      comments: comments,
      rating: rating ?? 0,
      date: date?.format("DD/MM/YYYY")
    }
    onSubmit(newEvaluation)
    addEvaluation(newEvaluation)
    handleUpdateEvaluation(employeeEmail)
    resetStates()
    onClose()
  }



  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Employee Evaluation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill out the form below to evaluate the employee.
        </DialogContentText>
        <Box
          component="form"
          onSubmit={handleAddEvaluation}
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
        >
          <TextField label="Employee Name" value={employName} disabled />
          <FormControl required>
            <InputLabel>Performance</InputLabel>
            <Select
              value={performance}
              onChange={(e) => setPerformance(e.target.value as Performance)}
            >
              <MenuItem value={Performance.HIGH}>High</MenuItem>
              <MenuItem value={Performance.MEDIUM}>Medium</MenuItem>
              <MenuItem value={Performance.LOW}>Low</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            multiline
            rows={4}
          />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography component="legend">Rating</Typography>
            <Rating
              name="employee-rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue)
              }}
            />
          </Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha"
              slots={{
                openPickerIcon: CalendarMonth
              }}
              slotProps={{
                textField: {
                  variant: "outlined"
                },
                openPickerButton: {
                  style: { color: "#aaaca6" }
                }
              }}
              sx={{
                width: "100%"
              }}
              value={date}
              onChange={(date) => handleDateChange(date as Dayjs | null)}
              format="DD/MM/YYYY"
            />
          </LocalizationProvider>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button
          onClick={handleAddEvaluation}
          sx={{ backgroundColor: "#035096", color: "white" }}
          disabled={!areAllFieldsFilled()}
        >
          Crear Evaluacion
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EvaluationModal
