import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import ImageService from "../../services/ImageService";
import defaultPhoto from '../../assets/images/profile.jpeg';
import GoBackButton from "../buttons/GoBackButton";
import "../../styles/Profile.css";
import { Link } from 'react-router-dom';


const PublicProfile = () => {
    const { mentorNickname } = useParams();
    const [unverifiedMentors, setUnverifiedMentors] = useState([]);
    const mentorUrl = `http://localhost:8080/api/v1/mentors/unverified`;
  
    useEffect(() => {
      fetch(mentorUrl)
        .then(response => response.json())
        .then(data => setUnverifiedMentors(data))
        .catch(error => console.log(error));
    }, []);
  
    const handleAccept = async mentorNickname => {
      const url = `http://localhost:8080/api/v1/admins/${mentorNickname}/approve`;
  
      try {
        await fetch(url, { method: 'POST' });
        setUnverifiedMentors(
          unverifiedMentors.filter(mentor => mentor.nickname !== mentorNickname)
        );
      } catch (error) {
        console.log("error", error);
      }
    };
  
    return (
      <div className="container profile">
        <GoBackButton />
        <div className="profile-container">
          <div className="rounded-top text-white d-flex flex-row">
            <div className="ms-4 mt-5 d-flex flex-column text-dark align-items-center">
              <p>Admin</p>
            </div>
          </div>
        </div>
        <br />
        <div className="dreams-grid">
          {unverifiedMentors.length > 0 &&
            unverifiedMentors.map(mentor => (
              <div key={mentor.id}>
                <div className="dream-image-container">
                  {mentor.image ? (
                    <ImageService data={mentor} className="dream-image" />
                  ) : (
                    <img src={defaultPhoto} alt="dream" className="dream-image" />
                  )}
                  <div className="dream-title">{mentor.nickname}</div>
                </div>
                <button
                  onClick={() => handleAccept(mentor.nickname)}
                  className="btn btn-primary mb-3"
                >
                  accept
                </button>
              </div>
            ))}
        </div>
      </div>
    );
  };
  
  export default PublicProfile;