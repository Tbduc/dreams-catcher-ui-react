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
import main_banner from '../../../src/assets/images/main_banner_dreamer.jpg';
import main_banner_mentor from '../../../src/assets/images/main_banner_mentor.jpg';



const Home = () => {
  const currentUser = AuthService.getCurrentUser()
  console.log(currentUser)
    return (
        <React.Fragment>
          <Navbar/>
            <LoginPopUp user={currentUser}/>
            <div className="home-banner">
                <img className="home-image me-5" src={main_banner} />
                <img className="home-image" src={main_banner_mentor} />
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