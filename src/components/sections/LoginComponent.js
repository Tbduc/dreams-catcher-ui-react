import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "../user-oauth2/login/GoogleLogin";
import { getCurrentUser } from "../../services/Oauth2Services"
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
import "../../styles/Login.css"

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onChangeUsername = (e) => {
    setUserName(e.target.value);
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const onSubmit = () => {
    handleLogin();
  };

  const handleLogin = () => {
      setMessage("");
      setLoading(true)

      const resp = AuthService.login(username, password)
      resp.then((response) => {
          console.log(response)
          setAuthenticated(true)
          navigate('/profile')
        }).catch((error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false)
          setMessage(resMessage)
        });
  }

  useEffect(() => {
    if(authenticated)
      navigate('/profile')
  }, [authenticated])

  return (
    <div>
      <Navbar/>
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <form onSubmit={handleSubmit(onSubmit)} id="login">
            
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
            <button
                className="btn btn-primary btn-block mt-2"
                disabled={loading}
                type="submit"
                form="login"
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
            </button>
          </form>
          <GoogleLogin />
          {message && (
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

export default withRouter(Login);