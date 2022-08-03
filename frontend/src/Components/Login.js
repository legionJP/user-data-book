import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../Api/api.js";
function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("token") !== "") {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [error,setError]=useState({
    isError:false,
    errorMessage:""
  })
  function handleChange(event) {
    const { name, value } = event.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = userDetails;
    const response = await API.login({ email, password });
    if (response.status === 201) {
      localStorage.setItem("token", response?.data?.token);
      navigate("/home");
      return;
    }
    else
    {
      setError({
        isError:true,
        errorMessage:response.data.error
      })
        setTimeout(()=>{setError({
          isError:false,
          errorMessage:""
        })},3000)

    }
  };
  return (
    <div className="login-signup">
      <div className="header">
        <h1 style={{color:"darkgreen"}}>Login</h1>
      </div>
      {error.isError && <div className="alert error-dailog">{error.errorMessage}</div>} 
      <div className="login-signup-form">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1"> Enter Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter your email"
            name="email"
            style={{backgroundColor:"lightblue"}}
            value={userDetails.email}
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We never share your password and email with others.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1"> Enter Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder=" Enter Password"
            name="password"
            style={{backgroundColor:"lightblue"}}
            value={userDetails.password}
            onChange={handleChange}
          />
        </div>
        <Button variant="contained" onClick={handleSubmit} style={{ marginTop: "20px" }}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
