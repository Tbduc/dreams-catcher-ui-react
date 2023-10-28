import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { isEmail } from "validator";
import Navbar from "./Navbar";

import AuthService from "../../services/AuthService";
import { withRouter } from '../../common/WithRouter';
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const arr = []
const rolesArr = ["dreamer", "mentor"]

const Register = () => {

  const roles = [
    {
      value: 'dreamer',
      label: 'Dreamer',
    },
    {
      value: 'mentor',
      label: 'Mentor',
    }
  ];

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [username, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(null);
  const [successful, setSuccessful] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onChangeUsername = (e) => {
    setUserName(e.target.value)
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const onChangeRole = (e) => {
    setRole(e.target.value)
  }

  const handleRegister = () => {

    setMessage(null)
    setSuccessful(false)

    arr.push(role)
    AuthService.register(
      username,
      email,
      password,
      arr
    ).then(
      response => {
        setMessage(response.data.message)
        setSuccessful(true)
      },
      error => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setSuccessful(false)
        setMessage(resMessage)
      }
    ).then(async() => {
      await delay(3000)
      refreshPage()
  });
  }

  function refreshPage() {
      window.location.reload(false);
  }

  const delay = ms => new Promise(res => setTimeout(res, ms));

  const onSubmit = () => {
    handleRegister();
  };

  useEffect(() => {
    setRole(role)
  }, [role])

  return (
    <div>
    <Navbar/>
    <div className="col-md-12">
        <div className="card card-container login-card">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <form onSubmit={handleSubmit(onSubmit)} id="login" className="text-center">
            
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <TextField id="standard-basic" label="Username" variant="standard"
                  {...register("userName", {
                      required: true,
                      minLength: 3,
                      maxLength: 20,
                      pattern: /^[A-Za-z0-9\-_\.]+$/i
                    })}
                  value={username}
                  onChange={(e) => onChangeUsername(e)}/>
            </FormControl>
                
              {errors?.userName?.type === "required" && <p className="text-danger">This field is required</p>}
              {errors?.userName?.type === "minLength" && (
                <p className="text-danger login">Username cannot have less than 3 characters</p>
              )}
              {errors?.userName?.type === "maxLength" && (
                <p className="text-danger login">Username cannot exceed 20 characters</p>
              )}
              {errors?.userName?.type === "pattern" && (
                <p className="text-danger login">Alphabetical characters only</p>
              )}

              <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <TextField id="standard-basic" label="Email" variant="standard"
                  {...register("email", {
                      required: true,
                      pattern: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
                    })}
                  value={email}
                  aria-invalid={errors.email ? "true" : "false"} 
                  onChange={(e) => onChangeEmail(e)}/>
            </FormControl>
            {errors?.email?.type === "required" && <p className="text-danger">This field is required</p>}
            {errors?.email?.type === "pattern" && (
                <p className="text-danger login">Enter correct email format</p>
            )}

            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
              <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
              <Input
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                {...register("passwordRequired", { 
                  required: true,
                  minLength: 6,
                  maxLength: 40
                })}
                value={password}
                onChange={(e) => onChangePassword(e)}
              />
            </FormControl>
            {errors?.passwordRequired?.type === "minLength" && (
                <p className="text-danger login">Password cannot have less than 6 characters</p>
            )}
            {errors?.passwordRequired?.type === "maxLength" && (
              <p className="text-danger login">Password cannot exceed 40 characters</p>
            )}
            {errors.passwordRequired && <p>This field is required</p>}
            <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
              <TextField
                id="standard-select-role"
                select
                label="Role"
                defaultValue="dreamer"
                helperText="Please select your role"
                variant="standard"
                {...register("role", {
                  required: true,
                  dreamer: "dreamer",
                  mentor: "mentor"
                })}
                value={role}
                onChange={onChangeRole}
              >
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value} onChange={() => onChangeRole(option.value)}>
                  {option.label}
                </MenuItem>
              ))}
              </TextField>
            </FormControl>
            {errors?.role?.type === "required" && (
                <p className="text-danger login">This field is required</p>
            )}
            {errors?.role?.type === "dreamer" && (
                <p className="text-danger login">Choose either dreamer or mentor</p>
            )}
            {errors?.role?.type === "mentor" && (
                <p className="text-danger login">Choose either dreamer or mentor</p>
            )}


            <button
                className="btn btn-primary btn-block mt-2"
                type="submit"
                form="login"
            >
              <span>Register</span>
            </button>
          </form>
          {successful ? ( message &&
              <div className="form-group mt-3">
                <div className="alert alert-success" role="alert">
                  {message}
                </div>
              </div>
            )
          : ( message &&
            <div className="form-group mt-3">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withRouter(Register);