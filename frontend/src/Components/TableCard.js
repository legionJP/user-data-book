import React from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import API from "../Api/api";
import { Grid } from "@mui/material";
function TableCard({ tableName, showIcon = true, showDelete = true, change, setChange }) {
  const onClickDeleteButton = async () => {
    const response = await API.deleteTable(tableName)
    if (response.status === 201) {
      await localStorage.setItem("token", response?.data?.token)
      setChange(!change)
    }
  }
  return (
    <Grid className="card" style={{ height: "75px", width: "11rem",flexDirection:"row-reverse", alignItems:"center", backgroundColor:"skyblue" , display: "flex", placeContent: "center", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
      {showDelete && <div style={{ textAlign: "right", marginRight: "10px" }}>
        <DeleteOutlineIcon color="error" style={{ cursor: "pointer" }} onClick={onClickDeleteButton} />
      </div>}
      <Link to={`/table/${tableName}`} style={{ textDecoration: "none", color: "black" }}>
        <div className="card-body">
          <h5 className="card-title" style={{ display: "flex", justifyContent: "center" }}>{tableName}&nbsp;&nbsp;{showIcon && <ArrowForwardIosIcon />}</h5>
        </div>
      </Link>
    </Grid>
  );
}

export default TableCard;  