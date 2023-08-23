import React, { useState } from 'react'
import LoginService from '../../services/LoginService'
import GoogleLogin from '../user-oauth2/login/GoogleLogin'

const SignIn = () => {
  const [login, setDreamer] = useState({
    username: "",
    password: "",
  })

  
  const [loggedIn, setLoggedIn] = useState(false);


  const handleChange = (e) => {
    const value = e.target.value;
    setDreamer({...login, [e.target.name]:value})
  }

  const signIn = (e) => {
    e.preventDefault();
    LoginService.signingIn(login)
      .then((response) => {
        console.log(response);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <div className='flex max-w-2xl mx-auto shadow border-b'>
      <div className='px-8 py-8'>
        <div className='font-thin text-2xl tracking-wider'>
          <h1>Sign In</h1>
        </div>
        <div className='items-center justify-center h-14 w-full my-4'>
          <label className='d-block'>Username</label>
          <input type="text" className='h-10 w-96 border mt-2 px-2 py-2' name="username" value={login.username} onChange={(e) => handleChange(e)}></input>
        </div>
        <div className='items-center justify-center h-14 w-full my-4'>
          <label className='d-block'>Password</label>
          <input type="text" className='h-10 w-96 border mt-2 px-2 py-2' name="password" value={login.password} onChange={(e) => handleChange(e)}></input>
        </div>
        <div className='items-center justify-center h-14 w-full my-4'>
          <button onClick={signIn} className='btn btn-success mb-3'>Log in</button>
        </div>
        <div className='items-center justify-center h-14 w-full my-4'>
          <button onClick={signIn} className='btn btn-success mb-3'>Log in</button>
        </div>
        <GoogleLogin />
      </div>
    </div>

  )
}

export default SignIn