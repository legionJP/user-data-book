import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { RESET_ROW, StyledTableCell, StyledTableRow } from "../Utils/tableView";
import API from "../Api/api";
import SearchIcon from "@mui/icons-material/Search";

function TableView() {
  const { tablename } = useParams();
  const [boolAdd, setBoolAdd] = useState(false);
  const [rows, setRows] = useState([]);
  const [newRowDetails, setNewRowDetails] = useState(RESET_ROW);
  useEffect(() => {
    getAllTableEntities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [categorySearch, setCategorySearch] = useState("name");
  const [textSearch, setTextSearch] = useState("");
  const getAllTableEntities = async () => {
    try {
      const response = await API.getAllEntities(tablename);
      setRows(response?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };
  function onClickAddRow() {
    setBoolAdd(!boolAdd);
  }

  const onClickDeleteRow = async (id) => {
    // :ERROR
    try {
      const response = await API.deleteEntityById(id);
      if (response.status === 201) {
        getAllTableEntities();
      }
    } catch (error) {
      console.log(error);
    }
  };
  function handleChange(e) {
    const { name, value } = e.target;
    setNewRowDetails({
      ...newRowDetails,
      [name]: value,
    });
  }
  const handleAddIconClick = async () => {
    if (newRowDetails.email === "" && newRowDetails.name === "") {
      return;
    }
    try {
      const response = await API.addEntity({
        ...newRowDetails,
        tableName: tablename,
      });
      if (response.status === 201) {
        setNewRowDetails(RESET_ROW);
        setBoolAdd(!boolAdd);
        getAllTableEntities();
      } else {
        // ::ERROR
      }
    } catch (error) {
      console.log(error);
      // ::ERROR
    }
  };
  const filterRow = (RowArray = []) => {
    return RowArray.filter(row => {
      if (categorySearch === 'name') {
        return row.name.toLowerCase().includes(textSearch.toLowerCase());
      }
      if (categorySearch === 'email') {
        return row.email.toLowerCase().includes(textSearch.toLowerCase());
      }
      if (categorySearch === 'phoneNumber') {
        return row.phoneNumber.toString().toLowerCase().includes(textSearch.toLowerCase());
      }
      if (categorySearch === 'dob' && row?.dob && textSearch) {
        const dateRow = new Date(row.dob)
        const dateFilter = new Date(textSearch)
        return dateRow.toDateString() === dateFilter.toDateString()
      }
      if (categorySearch === 'dob' && row?.dob === undefined && textSearch === "") {
        return true
      }
      return false
    })
  }
  return (
    <div>
      <div className="filter">
        <div className="search-bar" style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
          <SearchIcon style={{ marginLeft: "10px" }} />
          {
            categorySearch === "dob" ?
              <input type="date" value={textSearch} placeholder="Search On Date"
                onChange={(e) => { setTextSearch(e.target.value); }}
              ></input>
              :
              <input type="text" name="searchText" value={textSearch} placeholder="Search"
                onChange={(e) => { setTextSearch(e.target.value); }}></input>
          }
        </div>
        <FormControl style={{ width: "40%" }}>
          <InputLabel id="demo-simple-select-label">Select</InputLabel>
          <Select value={categorySearch} label="CategoryName"
            onChange={(e) => { setTextSearch(""); setCategorySearch(e.target.value); }}
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="phoneNumber">Phone number</MenuItem>
            <MenuItem value="dob">Date</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="tableview-div">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "30px" }}>Table: {tablename}</div>
          <Button
            variant="outlined"
            onClick={onClickAddRow}
            style={{ margin: "20px" }}
          >
            Add Record
          </Button>
        </div>
        <div className="tableview-table">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              {boolAdd && (
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      <TextField
                        variant="filled"
                        color="success"
                        name="name"
                        value={newRowDetails.name}
                        placeholder="Enter name"
                        onChange={handleChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <TextField
                        type="email"
                        variant="filled"
                        color="success"
                        name="email"
                        value={newRowDetails.email}
                        placeholder="Enter email"
                        onChange={handleChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <TextField
                        type="tel"
                        variant="filled"
                        color="success"
                        name="phoneNumber"
                        value={newRowDetails.phoneNumber}
                        placeholder="Enter Phone Number"
                        onChange={handleChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <TextField
                        type="date"
                        variant="filled"
                        color="success"
                        name="dob"
                        value={newRowDetails.dob}
                        placeholder="Enter Date"
                        onChange={handleChange}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <div className="actions" style={{ cursor: "pointer" }}>
                        <AddCircleOutlineIcon onClick={handleAddIconClick} />
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              )}
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="left">Email</StyledTableCell>
                  <StyledTableCell align="left">Phone Number</StyledTableCell>
                  <StyledTableCell align="left">Date</StyledTableCell>
                  <StyledTableCell align="left">actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterRow(rows).map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.email}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row.phoneNumber}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {new Date(row.dob)?.toDateString()}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <div className="actions">
                        <DeleteIcon style={{ marginRight: "2px", cursor: "pointer" }}
                          onClick={() => { onClickDeleteRow(row._id) }} />
                        &nbsp;
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {rows?.length === 0 && (
            <h5
              onClick={onClickAddRow}
              style={{
                textAlign: "center",
                cursor: "pointer",
                margin: "10px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              No Row Added
              <AddCircleOutlineIcon />
            </h5>
          )}
        </div>
      </div>
    </div>
  );
}

export default TableView;
