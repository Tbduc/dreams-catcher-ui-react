import React, { useState, useEffect } from 'react';
import "../../styles/OfferPage.css";
import { Link } from 'react-router-dom';
import ImageService from "../../services/ImageService";
import defaultPhoto from '../../assets/images/Default.jpeg';
import Navbar from '../sections/Navbar';
import { error } from 'jquery';


const AllDreams = () => {
  const [dreams, setDreams] = useState([]);

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => { 
    await fetch('http://localhost:8080/api/v1/dreams/all')
    .then(response => response.json())
    .then(data => setDreams(data))
    .catch(error => console.log(error));
  }
  
  return (
    <div>
      <Navbar/><br/><br/>
    <div className="container-all-dreams pb-3">
      <div className="header">
        <h1 className="all">ALL DREAMS</h1>
      </div>
      { dreams.length == 0 ? (
          <div class="loader-container d-flex justify-content-center">
            <div class="loader"></div>
          </div>
      ) : (
      <div className="dreams-grid">
        {Array.isArray(dreams) 
          ? dreams.map(dream => (
          <div className="dream-item">
            <Link to={`/dream-details/${dream.id}`} key={dream.id}>
            <div className="dream-image-container">
            { typeof dream.image !== Number ? (
              <ImageService data={dream} className="dream-image" />
            ) : (
              <img
                src={defaultPhoto}
                alt="dream"
                className="dream-image"
              />
            )}
              <div className="dream-title-page">{dream.dreamTitle}</div>
            </div>
            </Link>
          </div>
        ))
        : null}
      </div>)}
    </div>
    </div>
  );
};

export default AllDreams;