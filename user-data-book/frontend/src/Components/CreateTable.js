import { Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Api/api";
import { GetTablesFromToken } from '../Utils/token'
function CreateTable() {
  const navigate = useNavigate();
  const [tableDetails, setTableDetails] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (GetTablesFromToken()?.includes(tableDetails)) {
      // ::ERROR already table exists
    } else {
      const response = await API.addTable(tableDetails)
      if (response.status === 201) {
        localStorage.setItem("token", response?.data?.token)
        navigate("/home");
      }
    }
  };
  return (
    <div>
      <div className="creattable-div" style={{ minHeight: "50vh", padding: "10px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
        <div className="creattable-header">
          <h3 style={{ textAlign: "center" }}>
            Create Table
          </h3>
        </div>
        <div className="creattable-form">
          <div >
            <input
              type="text"
              className="form-control"
              id="tablename"
              placeholder="Enter Table Name"
              name="tableName"
              style={{ width: "100%" }}
              value={tableDetails}
              onChange={(e) => { setTableDetails(e?.target?.value) }}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit}
              style={{ margin: "20px auto" }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTable;
