"use client"

import React, { useEffect, useState } from "react"

import { Data, rows } from "@/app/assets/data/tables/employes-data"
import { EvaluationStatus } from "@/app/assets/data/tables/enums/employsEvaluation.enum"

import dayjs, { Dayjs } from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import useNolaStore from "@/app/(pages)/(store)/nolaStore"
import { useRouter } from "next/navigation"

export default function useStates() {
  const router = useRouter()

  type Order = "asc" | "desc"

  const getComparator = (order: Order, orderBy: keyof Data) => {
    return order === "desc"
      ? (a: Data, b: Data) => {
          const aValue = a[orderBy]
          const bValue = b[orderBy]

          if (aValue === undefined || bValue === undefined) {
            return 0
          }

          return bValue < aValue ? -1 : 1
        }
      : (a: Data, b: Data) => {
          const aValue = a[orderBy]
          const bValue = b[orderBy]

          if (aValue === undefined || bValue === undefined) {
            return 0
          }

          return aValue < bValue ? -1 : 1
        }
  }

  const stableSort = (
    array: Data[],
    comparator: (a: Data, b: Data) => number
  ) => {
    const stabilizedThis = array.map(
      (el, index) => [el, index] as [Data, number]
    )
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0])
      if (order !== 0) return order
      return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
  }

  dayjs.extend(customParseFormat)

  // STORE

  const evaluations = useNolaStore((state) => state.evaluations)
  const employees = useNolaStore((state) => state.employees)
  const deleteEvaluation = useNolaStore((state) => state.deleteEvaluation)
  const updateEmployeeEvaluation = useNolaStore(
    (state) => state.updateEmployeeEvaluation
  )

  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const handleAddEvaluation = (email: string) => {
    updateEmployeeEvaluation(email, EvaluationStatus.EVALUATED)
  }

  // Initial States
  const initialSearchValue = ""
  const initialSelectedDate: Dayjs | null = null

  const [searchValue, setSearchValue] = useState("")
  const [filteredRows, setFilteredRows] = useState(rows)

  const [dateSelected, setDateSelected] = useState<Dayjs | null>(null)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [order, setOrder] = useState<Order>("asc")
  const [orderBy, setOrderBy] = useState<keyof Data>("name")
  const [deleteModalType, setDeleteModalType] = useState("")

  const [checked, setChecked] = useState(false)
  const [allChecked, setAllChecked] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const [openMenuIndex, setOpenMenuIndex] = useState(null)

  // Modals
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false)
  const [isEditEvaluationModalOpen, setIsEditEvaluationModalOpen] =
    useState(false)
  const [openViewEvaluation, setOpenViewEvaluation] = useState(false)
  const [openDeleteEvaluation, setOpenDeleteEvaluation] = useState(false)

  const [selectedEmployeeEmail, setSelectedEmployeeEmail] = useState<
    string | null
  >(null)
  const [selectedEmployeeName, setSelectedEmployeeName] = useState<string>("")
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>(0)
  const [selectedEvaluationId, setSelectedEvaluationId] = useState<number>(0)
  const [selectedEvaluation, setSelectedEvaluation] = useState<any>()

  const employeeSelected = evaluations.filter(
    (test) => test.employeeId === selectedEmployeeId
  )

  const getLastEmployeeId = () => {
    if (employeeSelected.length === 0) return null
    return Math.max(...employeeSelected.map((emp) => emp.id))
  }

  useEffect(() => {
    const evaluationIdSelected = employeeSelected.filter(
      (eva) => eva.id === getLastEmployeeId()
    )

    setSelectedEvaluationId(evaluationIdSelected[0]?.id)
    setSelectedEvaluation(evaluationIdSelected[0])
  }, [employeeSelected])

  const handleOpenEvaluationModal = () => {
    setIsEvaluationModalOpen(true)
  }
  const handleOpenEditEvaluationModal = () => {
    setIsEditEvaluationModalOpen(true)
  }
  const handleCloseEditEvaluationModal = () => {
    setIsEditEvaluationModalOpen(false)
  }

  const handleCloseEvaluationModal = () => {
    setIsEvaluationModalOpen(false)
    setSelectedEmployeeEmail(null)
  }

  const handleCloseDeleteEvaluationModal = () => {
    setOpenDeleteEvaluation(false)
  }
  const handleOpenDeleteEvaluationModal = () => {
    setOpenDeleteEvaluation(true)
  }

  const handleCloseViewEvaluationModal = () => {
    setOpenViewEvaluation(false)
  }

  interface EvaluationData {
    id: number
    name: string
  }

  const handleSubmitEvaluation = (evaluationData: EvaluationData) => {
    console.log("Evaluation Data:", evaluationData)
  }

  const open = Boolean(anchorEl)

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget)
    setOpenMenuIndex(index)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setOpenMenuIndex(null)
  }

  useEffect(() => {
    setPage(0)
    setFilteredRows(
      employees.filter((row) => {
        const searchValueLower = searchValue.toLowerCase()
        const nameMatch = row.name.toLowerCase().includes(searchValueLower)
        const emailMatch = row.email.toLowerCase().includes(searchValueLower)
        const performanceMatch = row.performance
          .toLowerCase()
          .includes(searchValueLower)
        const evaluationMatch = row.evaluation
          .toLowerCase()
          .includes(searchValueLower)
        const phoneMatch = row.phone.toLowerCase().includes(searchValueLower)
        const roleMatch = row.role.toLowerCase().includes(searchValueLower)

        return (
          nameMatch ||
          emailMatch ||
          phoneMatch ||
          roleMatch ||
          performanceMatch ||
          evaluationMatch
        )
      })
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, employees])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const handleDelete = (type: string) => {
    setDeleteModalType(type)
    setOpenDeleteModal(true)
  }

  const handleRequestSort = (property: keyof Data) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }
  const handleChangeAllCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
    setAllChecked(event.target.checked)
  }

  // RESET STATES
  const refresh = () => {
    setSearchValue(initialSearchValue)
    setDateSelected(initialSelectedDate)
    setFilteredRows(rows)
  }

  return {
    router,

    selectedEmployeeName,
    setSelectedEmployeeName,
    setSelectedEmployeeEmail,
    selectedEmployeeEmail,
    updateEmployeeEvaluation,
    handleAddEvaluation,
    employees,
    getComparator,
    stableSort,
    openDeleteModal,
    searchValue,
    setSearchValue,
    filteredRows,
    setFilteredRows,
    dateSelected,
    page,
    rowsPerPage,
    order,
    orderBy,
    deleteModalType,
    checked,
    allChecked,
    anchorEl,
    openMenuIndex,
    setAllChecked,
    setAnchorEl,
    setOpenMenuIndex,
    open,
    handleClick,
    handleClose,
    handleSearchChange,
    handleDelete,
    handleRequestSort,
    handleChangePage,
    handleChangeRowsPerPage,
    handleChange,
    handleChangeAllCheck,
    refresh,

    isEvaluationModalOpen,
    handleOpenEvaluationModal,
    handleCloseEvaluationModal,
    handleSubmitEvaluation,

    openViewEvaluation,
    setOpenViewEvaluation,
    handleCloseViewEvaluationModal,

    selectedEmployeeId,
    setSelectedEmployeeId,

    deleteEvaluation,
    selectedEvaluationId,
    setSelectedEvaluationId,
    openDeleteEvaluation,
    setOpenDeleteEvaluation,
    handleOpenDeleteEvaluationModal,
    handleCloseDeleteEvaluationModal,

    selectedEvaluation,
    isEditEvaluationModalOpen,
    handleOpenEditEvaluationModal,
    handleCloseEditEvaluationModal
  }
}
