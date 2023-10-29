import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../../App.css";
import ImageService from "../../services/ImageService";
import defaultPhoto from '../../assets/images/Default.jpeg';

const DreamsGrid = () => {
    const [dreams, setDreams] = useState([]);
    const url = `http://localhost:8080/api/v1/dreams/recents`;

    
    useEffect(() => {
    
        const fetchData = async () => {
          try {
            const response = await fetch(url);
            const json = await response.json();
            setDreams(json)
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData();
  
    }, []);
    
  
    return (
    <div className="container-just-added">
        <div className="header mb-5">
          <h1 className="just mt-1">RECENTLY ADDED</h1>
        </div>
        { dreams.length == 0 &&
          <div class="loader-container d-flex justify-content-center">
            <div class="loader"></div>
          </div>
        } 
      <div className="dreams-grid">
        {dreams && dreams.map(dream => (
          <Link to={`/dream-details/${dream.id}`} key={dream.id} className="dream-item">
            <div className="dream-image-container">
            {dream.image ? (
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
        ))}
      </div>
    </div>
    );
  };
  
  export default DreamsGrid;
