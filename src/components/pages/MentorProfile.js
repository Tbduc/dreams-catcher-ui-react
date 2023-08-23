import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import ImageService from "../../services/ImageService";
import defaultPhoto from '../../assets/images/profile.jpeg';
import GoBackButton from "../buttons/GoBackButton";
import "../../styles/Profile.css";
import { Link } from 'react-router-dom';
import AvatarService from "../../services/AvatarService";
import axios from 'axios';



const PublicProfile = () => {
    const { nickname } = useParams();
    const [mentor, setMentor] = useState({});
    const [offers, setOffers] = useState([]);
    const mentorUrl = `https://localhost:8080/api/v1/mentors/${nickname}`;
    const [followed, setFollowed] = useState(false);
    const [unfollowed, setUnfollowed] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'))
    const accessToken = localStorage.getItem("accessToken")
    let config = {};
  

    useEffect(() => {
        fetchData()
    }, [nickname]);

    const fetchData = () => {
        fetch(mentorUrl)
        .then(resp => {
          return resp.json();
        })
          .then(data => {setMentor(data)})
          .catch(error => console.log(error));
    }

    if (!user.accessToken)
      config = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
      }
    else
      config = {
        headers: {
            Authorization: `Bearer ${user.accessToken}`,
        }
      }


    useEffect(() => {
      fetch(mentorUrl + '/offers')
      .then(response => {
        console.log(response);
        return response.json();
      })
        .then(data => {setOffers(data)})
        .catch(error => console.log(error));
    }, []);

    const handleFollowUnfollow = () => {
      if (followed) {
          handleUnfollow();
        setFollowed(false);
        setUnfollowed(true);
      } else if (unfollowed) {
          handleFollow();
        setFollowed(true);
        setUnfollowed(false);
      } else {
          handleFollow();
        setFollowed(true);
      }
    }

  const handleFollow = async () => {
      try {
          console.log(config)
          await axios.put(mentorUrl + '/follow', {}, config);
          setFollowed(true);
          setMentor({ ...mentor, followers: mentor.followers + 1 });
      } catch (error) {
          console.log("error", error);
      }
  }

  const handleUnfollow = async () => {
      try {
          console.log(config)
          await axios.put(mentorUrl + '/unfollow', {}, config);
          setUnfollowed(true);
          setMentor({ ...mentor, followers: mentor.followers - 1 });
      } catch (error) {
          console.log("error", error);
      }
  }

  return (
    <div className="container profile">
      <GoBackButton />
      <div className="profile-container">
        <div className="rounded-top text-white d-flex flex-row">
        <div className="ms-4 mt-5 d-flex flex-column text-dark align-items-center">
        {mentor.id && mentor.profilePictureId ? (
            <AvatarService data={mentor.profilePictureId} className="user-photo" />
          ) : (
            <img
              src={defaultPhoto}
              className="user-photo"
            /> 
          )}
          <br/><header><h3><strong>{mentor.username}</strong> </h3></header>
            <p>Mentor</p>
            <p>Followers: {mentor.followers}</p>
            <button className="follow-btn" onClick={handleFollowUnfollow}>{followed ? 'Unfollow' : 'Follow'}</button><br/>
          </div>
        </div>
      </div><br/>

      <div className="dreams-grid pb-3">
        {offers.map(offer => (
          <Link to={`/dream-details/${offer.id}`} key={offer.id} className="dream-item">
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
              <div className="dream-title">{offer.title}</div>
            </div>
          </Link>
        ))}
      </div>

  </div>
  );
};
  
export default PublicProfile;