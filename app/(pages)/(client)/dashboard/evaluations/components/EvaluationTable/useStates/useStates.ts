"use client"

import React, { useEffect, useState } from "react"


import dayjs, { Dayjs } from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import useNolaStore from "@/app/(pages)/(store)/nolaStore"
import { columns,Data,rows } from "@/app/assets/data/tables/evaluation-data"


export default function useStates() {
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

  const evaluations = useNolaStore((state) => state.evaluations) //STORE
  const addEvaluation = useNolaStore((state) => state.addEvaluation)

  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  // Initial States
  const initialSearchValue = ""
  const initialSelectedDate: Dayjs | null = null

  const [searchValue, setSearchValue] = useState("")
  const [filteredRows, setFilteredRows] = useState(evaluations)

  const [dateSelected, setDateSelected] = useState<Dayjs | null>(null)

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [order, setOrder] = useState<Order>("asc")
  const [orderBy, setOrderBy] = useState<keyof Data>("employeeName")
  const [deleteModalType, setDeleteModalType] = useState("")


  const [anchorEl, setAnchorEl] = useState(null)
  const [openMenuIndex, setOpenMenuIndex] = useState(null)
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false)



  const handleOpenEvaluationModal = () => {
    setIsEvaluationModalOpen(true)
  }

  const handleCloseEvaluationModal = () => {
    setIsEvaluationModalOpen(false)
  }

  const handleSubmitEvaluation = (evaluationData: any) => {
    console.log("Evaluation Data:", evaluationData)
    // Aquí puedes manejar el envío de los datos de evaluación
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
        evaluations.filter((row) => {
        const searchValueLower = searchValue.toLowerCase()
        const nameMatch = row.employeeName.toLowerCase().includes(searchValueLower)
        const performanceMatch = row.performance
          .toLowerCase()
          .includes(searchValueLower)

        return (
          nameMatch || performanceMatch 

        )
      })
    )

  }, [searchValue])

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



  // RESET STATES
  const refresh = () => {
    setSearchValue(initialSearchValue)
    setDateSelected(initialSelectedDate)
    setFilteredRows(rows)
  }


  return {
    evaluations,
    addEvaluation,
    getComparator,
    stableSort,
    openDeleteModal,
    searchValue,
    setSearchValue,
    columns,
    filteredRows,
    setFilteredRows,
    dateSelected,
    page,
    rowsPerPage,
    order,
    orderBy,
    deleteModalType,

    anchorEl,
    openMenuIndex,

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
    refresh,
    isEvaluationModalOpen,
    handleOpenEvaluationModal,
    handleCloseEvaluationModal,
    handleSubmitEvaluation
  }
}
