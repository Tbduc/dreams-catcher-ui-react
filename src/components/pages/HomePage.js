import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <MainContainer>
      <BackgroundImage src="https://i.im.ge/2023/03/27/IrlAPS.bg.jpg" />
      <Button to="/home">Let's start!</Button>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const Button = styled(Link)`
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  display: block;
  width: 250px;
  height: 50px;
  font-family: "Abril Fatface", cursive;
  font-size: 20px;
  color: white;
  background-color: #d24d59;
  border: 2px solid #d24d59;
  border-radius: 25px;
  text-align: center;
  line-height: 50px;
  transition: background-color 0.3s, color 0.3s;
  text-decoration: none;

  &:hover {
    background-color: #DC7C84;
    color: white;
  }
`;

export default HomePage;