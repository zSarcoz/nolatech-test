import { MouseEvent as ReactMouseEvent } from "react"

import {
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  TextField,
  styled,
  TableCell
} from "@mui/material"
import {
  FirstPage as FirstPageIcon,
  LastPage as LastPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Search
} from "@mui/icons-material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Image from "next/image"
import emptyEvaluation from "../../../../../../assets/images/svgs/empty-evaluations.svg"

import useStates from "./useStates/useStates"


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


const StyledTableHeaderCell = styled(TableCell)({
  backgroundColor: "#efefef",
  position: "sticky",
  padding: 0,
  top: 0,
  border: 1,
  minWidth: "130px",
  // width:"10%",
  maxWidth: "300px"
})

const CustomTableCell = styled(TableCell)(() => ({
  padding: "10px 10px"
}))

const CustomTableRow = styled(TableRow)(() => ({}))

export default function EvaluationsTable() {
  const {
    getComparator,
    stableSort,
    searchValue,
    columns,
    filteredRows,
    page,
    rowsPerPage,
    order,
    orderBy,

    handleSearchChange,
    handleRequestSort,
    handleChangePage,
    handleChangeRowsPerPage

  } = useStates()

  return (
    <div className="w-full h-full flex flex-col gap-y-8">
      

      {/* Actions buttons and filters */}
      {filteredRows.length ? (
        <>
          <div className="w-full flex md:flex-col lg:flex-row md:flex-wrap lg:flex-nowrap items-center justify-between gap-x-4 gap-y-4">
            <div className="flex items-center justify-start w-full gap-x-4 gap-y-4 md:flex-col lg:flex-row">
              {/* Search bar */}
              <div className="flex flex-row gap-x-4 items-center md:w-full lg:w-[35%]">
                <TextField
                  variant="filled"
                  placeholder="Employ Name or Performance"
                  label="Evaluation"
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
                    {columns.map((column,colIndex) => (
                      <StyledTableHeaderCell
                        align="center"
                        key={column.id}
                        className="font-pmedium"
                        sx={{
                          borderRight: colIndex === columns.length - 1 ? "none" : "1px solid #c6c7c1",
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stableSort(filteredRows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <CustomTableRow key={index}>
                        {columns.map((column,colIndex) => (
                          <CustomTableCell
                            key={column.id}
                            align="center"
                            style={{
                              height: "80px",
                              borderRight: colIndex === columns.length - 1 ? "none" : "1px solid #c6c7c1",
                              borderBottom: "1px solid #c6c7c1",
                              textAlign: "center",
                              maxWidth:"300px"
                            }}
                          >
                            <span className={`font-roboto text-sm `}>
                              {row[column.id]}
                            </span>
                          </CustomTableCell>
                        ))}
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
              labelRowsPerPage="Evaluaciones por pagina:"
              labelDisplayedRows={({ from, to, count }) =>
                `${from} - ${to} de ${count}`
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
        </>
      ) : (
        <div className="w-full h-full flex justify-center flex-col items-center">
          <h1 className="font-roboto text-primary font-bold text-4xl mb-10">No hay Evaluaciones realizadas</h1>
          <Image src={emptyEvaluation} alt="" className="w-1/3"/>
        </div>
      )}
    </div>
  )
}
