// Login.js
import React, { useState } from 'react';
import axios from "axios";
import './Login.css';
import { useContext } from "react"; //using context api
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MyContext } from "../../../context/MyContext";
import baseUrl from '../../../constants/Base';

function Login() {
  const { isLogIn, setLogin } = useContext(MyContext);
  const [credentials, setCredentials] = useState({ input: '', password: '' });
  const [errors, setErrors] = useState({ input: '', password: '' });

  const showToastFailureMessage = () => {
    toast.error("Invalid Credentials !", {
      position: "top-center",
    }); // to show invalid login toast message
  };

  const showToastSuccessMessage =()=>{
    toast.success("Logged In ", {
      position: "top-center",
    })
  }


  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error when user starts typing
  };

  const handleLogin = () => {
    const { input, password } = credentials;
    let newErrors = {};
    if (!input) {
      newErrors.input = 'Email is required';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // console.log('Credentials:', credentials);
      axios 
      .post("https://aaccback.onrender.com/api/login", {
        mail : credentials.input ,
        name : credentials.password
      }).then((res)=> {if(res.data.status == "Success"){
        showToastSuccessMessage();
        setLogin(true);
      
      }else{
        showToastFailureMessage();
      }} ).catch((err)=> {console.log(err); showToastFailureMessage()})
    }
  };

  return (
    <div className='login-container'>
      <form className='login-form'>
        <label className='heading'>Welcome</label>
        <label>Sign In for Seamless Experiences!</label>
        <div className='form-field'>
          <label className='form-itm'>Email</label>
          <input
            type='email'
            name='input'
            className={`form-itm ${errors.input ? 'invalid' : ''}`}
            placeholder='Enter your email'
            value={credentials.input}
            onChange={handleInputChange}
          />
          {errors.input && <span className='error'>{errors.input}</span>}
        </div>
        <div className='form-field'>
          <label className='form-itm'>Password</label>
          <input
            type='password'
            name='password'
            className={`form-itm ${errors.password ? 'invalid' : ''}`}
            placeholder='Enter your password'
            value={credentials.password}
            onChange={handleInputChange}
          />
          {errors.password && <span className='error'>{errors.password}</span>}
        </div>
        <div className='form-field' id='form-button1'>
          <input
            type='button'
            className='form-itm'
            id='form-btn'
            value='Sign In'
            onClick={handleLogin}
          />
          <span>Forgot password?</span>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
