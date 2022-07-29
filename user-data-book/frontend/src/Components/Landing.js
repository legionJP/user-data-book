import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
function Landing(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("token") !== "") {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function handleLoginCLick(e) {
    e.preventDefault();
    navigate('/login');
  }
  function handleSigninCLick(e) {
    e.preventDefault();
    navigate('/signup');
  }

  return (
      <div className="landing-page">
        <div className="landing-div">
          <div className="landing-div-header">
            <p>Welcome to</p>
            <h2>UserLogger For U</h2>
          </div>
          <div className="landing-div-footer">
            <Grid
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                height: "100%",
                margin: "auto",
              }}
              container
              spacing={4}
            >
              <Grid item sm={6} xs={12} >
                <Button variant="contained" color="success" startIcon={<LoginIcon />} onClick={handleLoginCLick}>Login</Button>
              </Grid>
              <Grid item sm={6} xs={12} >
                <Button variant="outlined" color="success" startIcon={<HowToRegIcon />} onClick={handleSigninCLick}>Signup</Button>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
  );
}

export default Landing;
