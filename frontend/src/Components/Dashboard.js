import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React, { useState } from "react";
import { TableCard } from "./";
import { useNavigate } from "react-router-dom";
import { GetTablesFromToken } from "../Utils/token";
import SearchIcon from "@mui/icons-material/Search";
import { Grid } from "@mui/material";
function Dashboard() {
  const navigate = useNavigate();
  const [searchProperties, setSearchProperties] = useState("");
  const [change, setChange] = useState(true)
  function handleAddClick(e) {
    e.preventDefault();
    navigate("/create-table");
  }
  const handleSearchChange = (event) => {
    setSearchProperties(event.target.value);
  };
  const filterTable = (tableArray = []) => {
    return tableArray.filter(tableName => tableName.toLowerCase().includes(searchProperties.toLowerCase()))
  }
  return (
    <div className="dashboard">
      <div className="search-bar" style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px" }}>
        <SearchIcon style={{ marginLeft: "10px" }} />
        <input type="text" name="tablename" value={searchProperties.searchText}
          placeholder="Enter Name of Table to search" onChange={handleSearchChange}
        ></input>
      </div>

      <Grid container className="table-list">
        {filterTable(GetTablesFromToken()).map((tableName,index) => {
          return <TableCard key={index} tableName={tableName} change={change} setChange={setChange} />;
        })}
        <TableCard
          showDelete={false}
          showIcon={false}
          tableName={
            <div className="add" onClick={handleAddClick}>
              Add Table
              <AddCircleOutlineIcon color="primary" fontSize="large" />
            </div>
          }
        />
      </Grid>
    </div>
  );
}

export default Dashboard;
