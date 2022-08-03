import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { GetUserNameFromToken } from "../Utils/token";
import { Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
const Header = (props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/home");
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div>
      <div
        className="nav"
        style={{
          alignItems:"center",
          height: "50px",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        }}
      >
       
       <div>
          <span
            style={{ fontSize: "15px", display: "flex", alignItems: "center" }}
          >
            <AccountCircleIcon />
            {GetUserNameFromToken()}&nbsp;&nbsp;&nbsp;
          </span>
        </div>

        <div className="nav-left" onClick={handleClick}>
          <span style={{ fontSize: "30px", cursor: "pointer", color: "darkblue" }}>
            User Data Book
          </span>
        </div>

        <div
          className="nav-right"
          style={{ alignItems: "center", justifyContent: "flex-end", width: "auto" }}
        >

          <div onClick={handleLogout}>
            <Button style={{ width: "auto", color: "black" }} endIcon={<LogoutIcon />}>
              Logout
            </Button>
            &nbsp;&nbsp;
          </div>
        </div>
      </div>
      {props.children}
    </div>
  );
};

export default Header;  
