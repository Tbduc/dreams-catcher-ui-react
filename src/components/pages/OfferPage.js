import React, { useState, useEffect } from 'react';
import "../../styles/OfferPage.css";
import { Link } from 'react-router-dom';
import defaultPhoto from '../../assets/images/Default.jpeg';
import ImageService from "../../services/ImageService";
import Navbar from '../sections/Navbar';

const OfferPage = () => {
  const [offer, setOffer] = useState([]);

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => { 
    await fetch('http://localhost:8080/api/v1/offers/all')
    .then(response => response.json())
    .then(data => setOffer(data))
    .catch(error => console.log(error));
  }

  return (
    <div>
      <Navbar/><br/><br/>
      <div className="container-all-dreams">
        <div className="header">
          <h1 className="all">ALL OFFERS</h1>
        </div>
        { offer.length == 0 &&
            <div class="loader-container d-flex justify-content-center">
              <div class="loader"></div>
            </div>
        } 
        <div className="dreams-grid mb-3">
          {Array.isArray(offer) 
          ? offer.map((offer, index) => (
            <div className="dream-item">
              <Link to={`/offer-details/${offer.id}`} key={offer.id}>
                <div className="dream-image-container">
                {offer.image ? (
                  <ImageService data={offer} className="dream-image" />
                ) : (
                  <img
                    src={defaultPhoto}
                    alt="offer"
                    className="dream-image"
                  />
                )}
                  <div className="dream-title-page">{offer.title}</div>
                </div>
              </Link>
            </div>
          ))
          : null }
        </div>
      </div>
    </div>
  );
};

export default OfferPage;