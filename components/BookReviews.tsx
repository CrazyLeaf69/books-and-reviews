import {
  Box,
  Button,
  Input,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import moment from "moment";
import NoReviews from "./NoReviews";

interface props {
  reviews: reviews;
  bookId: string;
}

interface Data {
  comment: string;
  grade: number;
  added: string;
}

function createData(comment: string, grade: number, added: string): Data {
  return {
    comment,
    grade,
    added,
  };
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string | Date }, b: { [key in Key]: number | string | Date }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "comment",
    numeric: false,
    disablePadding: false,
    label: "Review",
  },
  {
    id: "grade",
    numeric: true,
    disablePadding: false,
    label: "Rating",
  },
  {
    id: "added",
    numeric: true,
    disablePadding: false,
    label: "Added",
  },
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <Tooltip
              title={orderBy === headCell.id ? (order === "desc" ? "sorted descending" : "sorted ascending") : ""}
              placement="top"
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            </Tooltip>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = () => (
  <Toolbar
    sx={{
      pl: { sm: 2 },
      pr: { xs: 1, sm: 1 },
    }}
  >
    <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
      Reviews:
    </Typography>
  </Toolbar>
);
const AddReviewForm = ({ id, setRows }: { id: string; setRows: React.Dispatch<React.SetStateAction<Data[]>> }) => {
  const [value, setValue] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    await fetch("http://127.0.0.1:8090/api/collections/reviews/records", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookId: id,
        comment: target.comment.value,
        grade: target.rating.value,
      }),
    });
    setRows((prev) => [
      ...prev,
      createData(target.comment.value.toString(), parseInt(target.rating.value), "Just Now"),
    ]);
    target.comment.value = "";
    setValue(0);
  };

  return (
    <div>
      <Typography sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, mb: 1 }} variant="body1" component="div">
        Add Review:
      </Typography>
      <form onSubmit={(e) => handleSubmit(e)} className="pl-4 flex flex-row items-start gap-2">
        <TextField type="text" name="comment" label="Review..." variant="outlined" multiline />
        <Rating
          name="rating"
          precision={0.5}
          size="large"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue ?? 2.5);
          }}
        />
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
};

const BookReviews = ({ reviews, bookId }: props) => {
  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("grade");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [rows, setRows] = useState(
    reviews.items.map((review) => createData(review.comment, review.grade, review.created))
  );

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;" }}>
        <EnhancedTableToolbar />
        <AddReviewForm id={bookId} setRows={setRows} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={"medium"}>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.length > 0 ? (
                rows
                  .sort(getComparator(order, orderBy))
                  .slice()
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                        <TableCell component="th" id={labelId} scope="row" padding="normal" align="left">
                          {row.comment}
                        </TableCell>
                        <TableCell align="right" className="w-[150px]">
                          <Rating name="read-only" value={row.grade} precision={0.5} readOnly />
                        </TableCell>
                        <TableCell align="right" id={labelId} padding="normal" className="w-[150px]">
                          {row.added != "Just Now" ? moment.utc(row.added).local().format("YY-DD-MM hh:mm") : row.added}
                        </TableCell>
                      </TableRow>
                    );
                  })
              ) : (
                <NoReviews />
              )}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 63 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default BookReviews;
