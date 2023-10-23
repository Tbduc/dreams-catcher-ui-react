import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import ImageService from "../../services/ImageService";
import defaultPhoto from '../../assets/images/profile.jpeg';
import GoBackButton from "../buttons/GoBackButton";
import "../../styles/Profile.css";
import { Link } from 'react-router-dom';
import AuthService from "../../services/AuthService";
import AvatarService from "../../services/AvatarService";
import axios from 'axios';



const PublicProfile = () => {
    const currentUser = AuthService.getCurrentUser();
    const { nickname } = useParams();
    const [dreamer, setDreamer] = useState({});
    const [dreams, setDreams] = useState([]);
    const dreamerUrl = `http://localhost:8080/api/v1/dreamers/${nickname}`;
    const [followed, setFollowed] = useState(false);
    const [unfollowed, setUnfollowed] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'))
    const accessToken = localStorage.getItem("accessToken")
    let config = {};
  

    useEffect(() => {
        fetch(dreamerUrl)
        .then(response => {
          console.log(response);
          return response.json();
        })
          .then(data => {setDreamer(data)})
          .catch(error => console.log(error));
      }, [nickname]);

    useEffect(() => {
      fetch(dreamerUrl + '/dreams')
      .then(response => {
        console.log(response);
        return response.json();
      })
        .then(data => {setDreams(data)})
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

  const handleFollow = async () => {
      try {
          await axios.put(dreamerUrl + '/follow', {}, config);
          setFollowed(true);
          setDreamer({ ...dreamer, followers: dreamer.followers + 1 });
      } catch (error) {
          console.log("error", error);
      }
  }

  const handleUnfollow = async () => {
      try {
          await axios.put(dreamerUrl + '/unfollow', {}, config);
          setUnfollowed(true);
          setDreamer({ ...dreamer, followers: dreamer.followers - 1 });
      } catch (error) {
          console.log("error", error);
      }
  }

  const getCurrentUserId = () => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      return currentUser.id;
    }
    return null;
  };

  console.log(dreamer)
  
  return (
    <div className="container profile">
      <GoBackButton />
      <div className="profile-container">
        <div className="rounded-top text-white d-flex flex-row">
        <div className="ms-4 mt-5 d-flex flex-column text-dark align-items-center">
        {dreamer.id && dreamer.profilePictureId ? (
            <AvatarService data={dreamer.profilePictureId} className="user-photo"/>
          ) : (
            <img
              src={defaultPhoto}
              className="user-photo"
            /> 
          )}
          <br/><header><h3><strong>{dreamer.username}</strong> </h3></header>
            <p>Dreamer</p>
            <p>Followers: {dreamer.followers}</p>
            <button className="follow-btn" onClick={handleFollowUnfollow}>{followed ? 'Unfollow' : 'Follow'}</button><br/>
          </div>
        </div>
      </div><br/>

      <div className="dreams-grid pb-3">
      {dreams.map(dream => (
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
            <div className="dream-title">{dream.dreamTitle}</div>
          </div>
        </Link>
      ))}
    </div>

    </div>
    );
};
  
  export default PublicProfile;