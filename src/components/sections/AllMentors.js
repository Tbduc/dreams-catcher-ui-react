import React, { useState, useEffect } from 'react';
import "../../styles/AllDreams.css";
import { Link } from 'react-router-dom';
import ImageService from "../../services/ImageService";
import defaultPhoto from '../../assets/images/Default.jpeg';
import Navbar from './Navbar';


const AllMentors = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    fetch('https://localhost:8080/api/v1/mentors/all')
      .then(response => response.json())
      .then(data => setMentors(Array.isArray(data) ? data : []))
    .catch(error => console.log(error));
  }, []);
  

  return (
    <div>
      <Navbar/><br/><br/>
    <div className="container-all-dreams pb-3">
      <div className="header">
        <h2 className="all">OUR MENTORS</h2>
      </div>
      <div className="dreams-grid">
        {mentors.map(mentor => (
          <Link to={`/mentor/${mentor.nickname}`} key={mentor.id} className="dream-item">
            <div className="dream-image-container">
            {mentor.profilePicture ? (
              <ImageService data={mentor} className="dream-image" />
            ) : (
              <img
                src={defaultPhoto}
                alt="dream"
                className="dream-image"
              />
            )}
              <div className="dream-title">{mentor.nickname}</div>
            </div>
          </Link>
        )) }
      </div>
    </div>
    </div>
  );
};

export default AllMentors;