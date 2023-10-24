import React from 'react'
import "../../App.css";
import DreamsGrid from '../sections/DreamsGrid';
import MostPopular from '../sections/MostPopular';
import styled from "styled-components";
import Navbar from '../sections/Navbar';
import AddDreamButton from '../buttons/AddDreamButton';
import AddOfferButton from '../buttons/AddOfferButton';
import AuthService from '../../services/AuthService';
import LoginPopUp from '../sections/login-pop-up/LoginPopUp';



const Home = () => {
  const currentUser = AuthService.getCurrentUser()
  console.log(currentUser)
    return (
        <React.Fragment>
          <Navbar/>
            <LoginPopUp user={currentUser}/>
            <div className="home-banner">
                <img className="home-image" src="https://i.im.ge/2023/03/26/Iliw0X.Niestandardowe-wymiary-1920x1080-px-11.jpg" />
            </div>
            {currentUser && (
              currentUser.roles[0].includes("ROLE_MENTOR") ? (<AddOfferButton user={currentUser} />)
              : (
                 <AddDreamButton/>))}
            <MostPopular/>
            <DreamsGrid/>
            <br/>
        </React.Fragment>
    )
}

export default Home;