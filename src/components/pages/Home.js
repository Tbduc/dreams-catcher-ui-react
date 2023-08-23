import React from 'react'
import "../../App.css";
import DreamsGrid from '../sections/DreamsGrid';
import MostPopular from '../sections/MostPopular';
import styled from "styled-components";
import Navbar from '../sections/Navbar';
import AddDreamButton from '../buttons/AddDreamButton';
import AddOfferButton from '../buttons/AddOfferButton';
import AuthService from '../../services/AuthService';



const Home = () => {
  const currentUser = AuthService.getCurrentUser()
  console.log(currentUser)
    return (
        <React.Fragment>
          <Navbar/>
            <HomeContainer>
                <BackgroundImage src="https://i.im.ge/2023/03/26/Iliw0X.Niestandardowe-wymiary-1920x1080-px-11.jpg" />
            </HomeContainer>
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

const HomeContainer = styled.div`
    height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    border-style: ridge;
    border-width: thin;
    border-color: black;
    margin-top: 10vh;
    margin-bottom: 10vh;
  `;
  
  const BackgroundImage = styled.img`
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
    height: 60%;
    z-index: -1;
  `;


export default Home;