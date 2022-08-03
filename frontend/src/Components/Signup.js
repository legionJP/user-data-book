import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import API from "../Api/api";
import { useNavigate } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("token") !== "") {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
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
    
    const { name, email, password, confirm_password } = userDetails;
    if(name===""&&password===""&&email===""&&confirm_password==="")
    {
      setError({
        isError:true,
        errorMessage:" Please fill all details"
      })
        setTimeout(()=>{setError({
          isError:false,
          errorMessage:""
        })},3000)
        return ;
    }
    if ((name, email && password === confirm_password)) {
      const response = await API.signup({ name, email, password });
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
    } 
  };
return (
  <div className="login-signup">
    <div className="header">
      <h1 style={{color:"darkgreen"}}>Signup</h1>
    </div>
     {error.isError && <div className="alert error-dailog">{error.errorMessage}</div>}
    <div className="login-signup-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="name"
          className="form-control"
          id="name"
          placeholder="Enter name"
          name="name"
          style={{backgroundColor:"lightblue"}}
          value={userDetails.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter email"
          name="email"
          style={{backgroundColor:"lightblue"}}
          value={userDetails.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Enter Password"
          name="password"
          style={{backgroundColor:"lightblue"}}
          value={userDetails.password}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirm_password">confirm password</label>
        <input
          type="password"
          className="form-control"
          id="confirm_password"
          placeholder="Enter Confirm Password"
          name="confirm_password"
          style={{backgroundColor:"lightblue"}}
          value={userDetails.confirm_password}
          onChange={handleChange}
        />
      </div>
      <Button
        variant="contained"
        onClick={handleSubmit}
        style={{ marginTop: "20px" }}
      >
        Sign up
      </Button>
    </div>
  </div>
);
}

export default Signup;
