import React from 'react'
import "../../App.css";
import DreamsGrid from '../sections/DreamsGrid';
import MostPopular from '../sections/MostPopular';
import Navbar from '../sections/Navbar';
import AddDreamButton from '../buttons/AddDreamButton';
import AddOfferButton from '../buttons/AddOfferButton';
import AuthService from '../../services/AuthService';
import LoginPopUp from '../sections/login-pop-up/LoginPopUp';
import CarouselMain from '../sections/carousel/CarouselMain';


const Home = () => {
  const currentUser = AuthService.getCurrentUser()
  console.log(currentUser)
    return (
        <React.Fragment>
          <Navbar/>
          <LoginPopUp user={currentUser}/>
          <CarouselMain />
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