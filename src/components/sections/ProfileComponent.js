import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import "../../styles/Profile.css";
import AvatarService from "../../services/AvatarService";
import defaultPhoto from '../../assets/images/profile.jpeg';
import GoBackButton from "../buttons/GoBackButton";
import { getCurrentUser } from "../../services/Oauth2Services"
import ProfileService from "../../services/ProfileService";
import Alert from "./Alert";
import Tooltip from "../../common/Tooltip";
import { ACCESS_TOKEN } from "../../constants";

export default class Profile extends Component {
  
  
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      currentUser: null,
      file: null
    };

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.photoUpload = this.photoUpload.bind(this)
  }

  loadCurrentlyLoggedInUser() {
    if(this.state.currentUser == null)
      getCurrentUser()
        .then(response => {
          console.log(response)
          if(response != undefined)
            localStorage.setItem("user", JSON.stringify(response));
          this.setState({
            currentUser: response,
            file: null
          });
        })
        .catch(error => {
          this.setState({
            loading: false
          });
        });
  }

  componentDidMount() {
    let checkCurrentUser = AuthService.getCurrentUser();
    if (checkCurrentUser) {
      this.setState({
        currentUser: checkCurrentUser,
        ...this.state.file
      });
    }

    if(!checkCurrentUser)
      this.loadCurrentlyLoggedInUser();
    else
      this.setState({
        currentUser: checkCurrentUser,
        ...this.state.file
      });
    
  }

  componentDidUpdate() {
    
  }

  handleClick() {
    this.myRef.click()
  }


  photoUpload = e =>{
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    if (file.size > 1048576) {
      return <Alert type="error" message="The uploaded file is too big" />
    }

    this.setState({
      ...this.state.currentUser,
      file: file,
    });
    this.state.file = file
    const button = document.querySelector(".submit-btn")
    button.click()
  }

  handleSubmit= e =>{
    e.preventDefault();
    console.log(this.state)
    console.log(this.state.currentUser.id)
    let accessToken = localStorage.getItem(ACCESS_TOKEN)
    ProfileService.updateUserImg(this.state.file, this.state.currentUser.id)
    .then( () => {
      if (accessToken)
        localStorage.removeItem("user")
      else {
        this.updateProfileImageId()
      }
    })
    this.refreshPage()
  }

  async updateProfileImageId() {
    await this.updateUserImage()
  }

  async refreshPage() {
    await this.delay(1500)
    window.location.reload(false);
  }

  delay = ms => new Promise(res => setTimeout(res, ms));

  async updateUserImage() {
    let user = await AuthService.getCurrentUserImgId(this.state.currentUser.id);
    let currentUser = JSON.parse(localStorage.getItem("user"))
    currentUser.profilePictureId = user.profilePictureId
    localStorage.removeItem("user")
    localStorage.setItem("user", JSON.stringify(currentUser))
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }
    let currentUser = this.state.currentUser;
    console.log(currentUser)
    return (
      <div className="container profile">
        <GoBackButton/>
      {/* <Navbar/><br/><br/> */}
      <div className="profile-container">
        <div className="text-white d-flex flex-row">
            <div className="ms-4 mt-5 d-flex flex-column text-dark align-items-center">
              {currentUser && (
                (() => {
                    let current = this.state.currentUser
                    if (current.profilePictureId) {
                        return <form onSubmit={this.handleSubmit}>
                        <label htmlFor="photo-upload" className="custom-file-upload">
                          <AvatarService data={current.profilePictureId} className=" rounded-circle" tooltip="true"/>
                          <input className="profile-change" style={{display: 'none'}}  id="photo-upload" type="file" ref={this.myRef} onChange={this.photoUpload} data-toggle-bs="tooltip" title="Upload new image"/>
                        </label>
                        <button style={{display: 'none'}} className="submit-btn" type="submit"></button>
                      </form>
                    } else if (current.profileImgUrl) {
                        return <form onSubmit={this.handleSubmit}>
                        <label htmlFor="photo-upload" className="custom-file-upload">
                          <Tooltip content="Upload new profile picture" direction="right">
                            <img
                              src={current.profileImgUrl}
                              alt={current.username}
                              class="rounded-circle"
                              width="150"
                            />
                          </Tooltip>
                          <input className="profile-change" style={{display: 'none'}} id="photo-upload" type="file" ref={this.myRef} onChange={this.photoUpload} />
                        </label>
                        <button style={{display: 'none'}} className="submit-btn" type="submit"></button>
                      </form>
                    } else {
                        return <form onSubmit={this.handleSubmit}>
                        <label htmlFor="photo-upload" className="custom-file-upload">
                          <Tooltip content="Upload new profile picture" direction="right">
                            <img
                              src={defaultPhoto}
                              className="rounded-circle"
                              width="150"
                            />
                          </Tooltip> 
                          <input className="profile-change" style={{display: 'none'}}  id="photo-upload" type="file" ref={this.myRef} onChange={this.photoUpload} />
                        </label>
                        <button style={{display: 'none'}} className="submit-btn" type="submit"></button>
                      </form>
                    }
                  })()
                )
              }
                <br/><header><h3><strong>{currentUser && currentUser.username}</strong> </h3></header>
                
                {currentUser &&       
                  (currentUser.roles &&
                    currentUser.roles.map((role, index) => (
                      <p key={index}>
                        {role === 'ROLE_DREAMER' ? 'Dreamer' : role === 'ROLE_MENTOR' ? 'Mentor' : role === 'ROLE_ADMIN' ? 'Admin' : role}
                      </p>
                    )))
                }
                  <button className="follow-btn pb-2">Settings</button>
                </div>
              </div>
            {(this.state.userReady) ?
            <div>
          </div>: null}
        </div>
      </div>
    );
  }
}

