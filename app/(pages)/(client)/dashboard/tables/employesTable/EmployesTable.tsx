import {
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  styled,
  TablePagination,
  MenuItem,
  TextField,
  Menu,
  ListItemIcon,
  ListItemText
} from "@mui/material"

import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import EditIcon from "@mui/icons-material/Edit"
import LibraryAddIcon from "@mui/icons-material/LibraryAdd"
import VisibilityIcon from "@mui/icons-material/Visibility"
import {
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Search
} from "@mui/icons-material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import PersonIcon from "@mui/icons-material/Person"

import { MouseEvent as ReactMouseEvent } from "react"

import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"

import { columns } from "@/app/assets/data/tables/employes-data"
import { EvaluationStatus } from "@/app/assets/data/tables/enums/employsEvaluation.enum"
import EvaluationModal from "@/app/_components/Modals/EvaluationModal.tsx/EvaluationModal"
import EmployeeEvaluationModal from "@/app/_components/Modals/EmployeeEvaluationModal/EmployeeEvaluationModal"
import DeleteEvaluationModal from "@/app/_components/Modals/DeleteModal/DeleteEvaluationModal"
import EditEvaluationModal from "@/app/_components/Modals/EditEvaluationModal/EditEvaluationModal"

import useStates from "./useStates/useStates"


import Link from "next/link"

dayjs.extend(customParseFormat)

const StyledTableCell = styled(TableCell)({
  backgroundColor: "#efefef",
  position: "sticky",
  top: 0
})

const StyledTableHeaderCell = styled(TableCell)({
  backgroundColor: "#efefef",
  position: "sticky",
  padding: 0,
  top: 0,
  border: 1,
  minWidth: "130px",
  maxWidth: "300px"
})

interface TablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onPageChange: (
    event: ReactMouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void
}

const TablePaginationActions: React.FC<TablePaginationActionsProps> = (
  props
) => {
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (
    event: ReactMouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event: ReactMouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (
    event: ReactMouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <div className="shrink-0 ml-2">
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <LastPageIcon />
      </IconButton>
    </div>
  )
}

const CustomTableCell = styled(TableCell)(() => ({
  padding: "10px 10px"
}))

const CustomTableRow = styled(TableRow)(() => ({}))

const EmployesTable: React.FC = () => {
  const {
    router,

    selectedEmployeeName,
    setSelectedEmployeeName,

    setSelectedEmployeeEmail,
    selectedEmployeeEmail,

    getComparator,
    stableSort,
    searchValue,
    filteredRows,

    page,
    rowsPerPage,
    order,
    orderBy,

    anchorEl,
    openMenuIndex,

    handleClick,
    handleClose,
    handleSearchChange,
    handleRequestSort,
    handleChangePage,
    handleChangeRowsPerPage,

    isEvaluationModalOpen,
    handleOpenEvaluationModal,
    handleCloseEvaluationModal,
    handleSubmitEvaluation,

    openViewEvaluation,
    setOpenViewEvaluation,
    handleCloseViewEvaluationModal,

    selectedEmployeeId,
    setSelectedEmployeeId,

    selectedEvaluationId,
    openDeleteEvaluation,
    handleOpenDeleteEvaluationModal,
    handleCloseDeleteEvaluationModal,

    selectedEvaluation,
    isEditEvaluationModalOpen,
    handleOpenEditEvaluationModal,
    handleCloseEditEvaluationModal
  } = useStates()

  return (
    <>
      <div className="w-full h-full flex flex-col gap-y-8">
        {/* Actions buttons and filters */}
        <div className="w-full flex md:flex-col lg:flex-row md:flex-wrap lg:flex-nowrap items-center justify-between gap-x-4 gap-y-4">
          <div className="flex items-center justify-start w-full gap-x-4 gap-y-4 md:flex-col lg:flex-row">
            {/* Search bar */}
            <div className="flex flex-row gap-x-4 items-center md:w-full lg:w-[35%]">
              <TextField
                variant="filled"
                placeholder="Employ, Perfomance, Eva. or Email"
                label="Employ"
                style={{ width: "80%" }}
                value={searchValue}
                onChange={handleSearchChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Search />
                    </InputAdornment>
                  )
                }}
              />
            </div>
          </div>
        </div>
        {/* Table */}
        <div className="w-full">
          <TableContainer
            component="div"
            sx={{
              borderTop: "1px solid #c6c7c1",
              borderLeft: "1px solid #c6c7c1",
              borderRight: "1px solid #c6c7c1",
              borderRadius: "20px"
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <StyledTableHeaderCell
                      align="center"
                      key={column.id}
                      className="font-pmedium"
                      sx={{
                        borderRight: "1px solid #c6c7c1",
                        px: "7px",
                        height: "80px"
                      }}
                    >
                      <TableSortLabel
                        sx={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center"
                        }}
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : "asc"}
                        onClick={() => handleRequestSort(column.id)}
                      >
                        <span className="font-medium font-poppins text-sm">
                          {column.label}
                        </span>
                      </TableSortLabel>
                    </StyledTableHeaderCell>
                  ))}
                  <StyledTableCell
                    align="center"
                    sx={{
                      borderRight: 0,
                      borderBottom: 0,
                      borderTopRightRadius: "20px",
                      alignItems: "center",
                      position: "sticky",
                      width: "10%"
                    }}
                  >
                    <span className="flex items-center w-full justify-center font-medium">
                      Actions
                    </span>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stableSort(filteredRows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <CustomTableRow key={index}>
                      {columns.map((column, colIndex) => (
                        <CustomTableCell
                          key={column.id}
                          align="center"
                          style={{
                            height: "80px",
                            borderRight: "1px solid #c6c7c1",
                            borderBottom: "1px solid #c6c7c1",
                            textAlign: "center"
                          }}
                        >
                          {colIndex === 0 ? (
                            <Link href={`/dashboard/employ/${row.id}`}>
                              <span
                                className={`font-roboto font-bold text-sm `}
                              >
                                {row[column.id]}
                              </span>
                            </Link>
                          ) : (
                            <span className={`font-roboto text-sm `}>
                              {row[column.id]}
                            </span>
                          )}
                        </CustomTableCell>
                      ))}
                      <CustomTableCell
                        sx={{
                          borderBottom: "1px solid #c6c7c1"
                        }}
                      >
                        <div className="w-full grid grid-cols-2 justify-items-center md:px-6 lg:px-5 md:gap-x-10 lg:gap-x-6">
                          <IconButton
                            sx={{
                              width: "32px",
                              height: "32px",
                              backgroundColor: "#f2f2f1",
                              mixBlendMode:
                                index % 2 === 0 ? "normal" : "multiply",
                              color: "#767873"
                            }}
                            onClick={() => {
                              // setItemToEdit(row)
                              setOpenViewEvaluation(true)
                              setSelectedEmployeeId(row.id)
                            }}
                          >
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton
                            style={{
                              width: "32px",
                              height: "32px",
                              mixBlendMode:
                                index % 2 === 0 ? "normal" : "multiply",
                              color: "#767873"
                            }}
                            id={`basic-button-${index}`}
                            aria-controls={
                              openMenuIndex === index
                                ? `basic-menu-${index}`
                                : undefined
                            }
                            aria-haspopup="true"
                            aria-expanded={
                              openMenuIndex === index ? "true" : undefined
                            }
                            onClick={(event) => {
                              handleClick(event, index)
                              setSelectedEmployeeId(row.id)
                            }}
                          >
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            id={`basic-menu-${index}`}
                            anchorEl={anchorEl}
                            open={openMenuIndex === index}
                            onClose={handleClose}
                            MenuListProps={{
                              "aria-labelledby": `basic-button-${index}`
                            }}
                          >
                            {row.evaluation ===
                            EvaluationStatus.NOTEVALUATED ? (
                              <MenuItem
                                onClick={() => {
                                  handleOpenEvaluationModal()
                                  setSelectedEmployeeId(row.id)
                                  setSelectedEmployeeEmail(row.email)
                                  setSelectedEmployeeName(row.name)
                                }}
                              >
                                <ListItemIcon>
                                  <LibraryAddIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Crear Evaluacion</ListItemText>
                              </MenuItem>
                            ) : (
                              <div>
                                <MenuItem onClick={()=>handleOpenEditEvaluationModal()}>
                                  <ListItemIcon>
                                    <EditIcon fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText>Edit</ListItemText>
                                </MenuItem>
                                <MenuItem
                                  onClick={() => {
                                    handleOpenDeleteEvaluationModal()
                                  }}
                                >
                                  <ListItemIcon>
                                    <DeleteForeverIcon fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText>Delete</ListItemText>
                                </MenuItem>
                              </div>
                            )}
                            <MenuItem
                              onClick={() =>
                                router.push(`/dashboard/employ/${row.id}`)
                              }
                            >
                              <ListItemIcon>
                                <PersonIcon fontSize="small" />
                              </ListItemIcon>
                              <ListItemText>Ver perfil</ListItemText>
                            </MenuItem>
                          </Menu>
                        </div>
                      </CustomTableCell>
                    </CustomTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            sx={{ display: "flex", color: "#aaaca9", marginTop: "20px" }}
            rowsPerPageOptions={[5, 10, 20, 50]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
            labelRowsPerPage="Employ per page:"
            labelDisplayedRows={({ from, to, count }) =>
              `${from} - ${to} of ${count}`
            }
            slotProps={{
              select: {
                IconComponent: ExpandMoreIcon,
                sx: {
                  backgroundColor: "#efefef",
                  color: "#aaaca6",
                  width: "100px !important",
                  height: "48px",
                  borderBottom: "1px solid #969790",
                  marginRight: "20px",
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,

                  "& .MuiInputBase-input": {
                    paddingRight: "4rem !important"
                  },
                  "&.Mui-focused .MuiInputBase-input ": {
                    paddingRight: "4rem !important",
                    backgroundColor: "#f4f4ee"
                  },
                  "& .MuiSelect-icon": {
                    color: "#bfc3b5"
                  }
                }
              }
            }}
          />
        </div>
      </div>

      {/* Evaluation Modal */}
      <EvaluationModal
        employName={selectedEmployeeName}
        employeeEmail={selectedEmployeeEmail}
        employeeId={selectedEmployeeId}
        open={isEvaluationModalOpen}
        onClose={handleCloseEvaluationModal}
        onSubmit={handleSubmitEvaluation}
      />

      <EmployeeEvaluationModal
        open={openViewEvaluation}
        onClose={handleCloseViewEvaluationModal}
        employeeId={selectedEmployeeId}
        evaluationId={selectedEvaluationId}
      />

      {/* Edit Modal */}

      <EditEvaluationModal
       open={isEditEvaluationModalOpen}
       onClose={handleCloseEditEvaluationModal}
       evaluationSelected={selectedEvaluation}
      />

      {/* Delete Modal */}

      <DeleteEvaluationModal
        evaluationId={selectedEvaluationId}
        open={openDeleteEvaluation}
        onClose={handleCloseDeleteEvaluationModal}
      />
    </>
  )
}

export default EmployesTable
